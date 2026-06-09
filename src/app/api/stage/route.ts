import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const roomType = formData.get("room_type") as string;
    const style = formData.get("style") as string;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const apiKey = process.env.MNML_API_KEY;

    // If no API key is provided, return a mock response for testing the UI
    if (!apiKey) {
      console.warn("No MNML_API_KEY found. Returning mock response.");
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Use a guaranteed existing image as a mock response
      const mockImage = `/demo/living-room-modern.c831fe91.webp`; 
      
      return NextResponse.json({ 
        success: true, 
        staged_image_url: mockImage,
        message: "Mock response generated. Add MNML_API_KEY to .env.local for real results."
      });
    }

    // Prepare request for MNML.ai ArchDiffusion v4.3
    const mnmlFormData = new FormData();
    mnmlFormData.append("image", image);
    
    const formattedRoom = (roomType || "living-room").replace("-", " ");
    const formattedStyle = style || "modern";
    
    let roomStyle = "Modern interior";
    if (formattedStyle === "modern") {
      roomStyle = "Modern interior";
    } else {
      roomStyle = formattedStyle.charAt(0).toUpperCase() + formattedStyle.slice(1);
    }

    // ArchDiffusion v4.3 requires the "prompt" parameter
    mnmlFormData.append("prompt", `Beautiful ${roomStyle} design of a ${formattedRoom}`);
    mnmlFormData.append("expert_name", "interior");
    mnmlFormData.append("room_type", formattedRoom);
    mnmlFormData.append("room_style", roomStyle);
    mnmlFormData.append("geometry", "precise");
    mnmlFormData.append("render_style", "photoreal");
    mnmlFormData.append("furnishing_level", "full");

    const response = await fetch("https://api.mnmlai.dev/v1/archDiffusion-v43", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        // FormData automatically sets the correct Content-Type with boundary
      },
      body: mnmlFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("MNML API Error:", response.status, errorData);
      const errorMessage = errorData.message || "Failed to generate image. Please try again.";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // The exact response structure depends on MNML.ai, but typically includes a result URL
    // e.g., { result: "https://..." } or { image_url: "https://..." }
    let stagedImageUrl = data.result || data.image_url || data.url;

    if (data.id && !stagedImageUrl) {
      // Poll for status
      let isProcessing = true;
      let attempts = 0;
      while (isProcessing && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const statusRes = await fetch(`https://api.mnmlai.dev/v1/status/${data.id}`, {
          headers: { "Authorization": `Bearer ${apiKey}` }
        });
        if (!statusRes.ok) continue;
        
        const statusData = await statusRes.json();
        const isSuccess = statusData.status === "success" || statusData.status === "succeeded";
        if (isSuccess && statusData.message && statusData.message.length > 0) {
          stagedImageUrl = statusData.message[0];
          isProcessing = false;
        } else if (statusData.status === "failed" || statusData.status === "error") {
          return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
        }
        attempts++;
      }
    }

    if (!stagedImageUrl) {
      return NextResponse.json({ error: "Failed to retrieve generated image" }, { status: 500 });
    }

    return NextResponse.json({ success: true, staged_image_url: stagedImageUrl });
  } catch (error) {
    console.error("Error processing staging request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
