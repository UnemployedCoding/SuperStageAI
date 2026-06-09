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

    // Prepare request for MNML.ai
    // According to typical MNML.ai API structure, it requires a POST with FormData
    const mnmlFormData = new FormData();
    mnmlFormData.append("image", image);
    mnmlFormData.append("room_type", roomType || "living_room");
    mnmlFormData.append("style", style || "modern");

    const response = await fetch("https://api.mnmlai.dev/v1/interior", {
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
    const stagedImageUrl = data.result || data.image_url || data.url;

    return NextResponse.json({ success: true, staged_image_url: stagedImageUrl });
  } catch (error) {
    console.error("Error processing staging request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
