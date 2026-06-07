import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  imageBase64: z.string().min(100),
  roomType: z.string().min(1).max(50),
  style: z.string().min(1).max(50),
});

export const stageImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) throw new Error("Missing REPLICATE_API_TOKEN");

    const Replicate = (await import("replicate")).default;
    const replicate = new Replicate({ auth: token });

    const prompt = `Professional real estate photograph of a fully furnished ${data.style} ${data.roomType}. Tasteful furniture, decor, plants, warm natural lighting. Keep the original room's walls, floors, windows, and architecture exactly the same. Photorealistic, magazine quality, wide angle interior photo.`;

    // FLUX Kontext Pro: image editing model, great for adding furniture while preserving structure
    const output = (await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input: {
          prompt,
          input_image: data.imageBase64,
          output_format: "jpg",
          safety_tolerance: 2,
        },
      },
    )) as unknown;

    let url: string | null = null;
    if (typeof output === "string") url = output;
    else if (Array.isArray(output) && typeof output[0] === "string") url = output[0];
    else if (output && typeof (output as { url?: () => URL }).url === "function") {
      url = (output as { url: () => URL }).url().toString();
    }

    if (!url) throw new Error("No image returned from staging model");

    // Fetch and re-encode as data URL so it stays available in the client
    // (Replicate URLs expire after ~1 hour).
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch staged image: ${res.status}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    let bin = "";
    for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
    const b64 = btoa(bin);
    return { dataUrl: `data:image/jpeg;base64,${b64}` };
  });