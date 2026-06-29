import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    // Determine extension based on content type
    let ext = "jpg";
    if (contentType.includes("png")) ext = "png";
    if (contentType.includes("webp")) ext = "webp";

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="superstage-room-${Date.now()}.${ext}"`,
      },
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new NextResponse("Failed to download image", { status: 500 });
  }
}
