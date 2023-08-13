import { join, extname } from "path";
import { handleError } from "../../handle-error";
import { readFileSync } from "fs";
import { ACCEPTED_IMAGES_TYPES } from "@/utils/constants";

type Params = { params: { imageName: string } };

function getType(fileName: string) {
  const ext = extname(fileName);

  if (!ACCEPTED_IMAGES_TYPES.includes(ext)) return;

  return `image/${ext}`;
}

export async function GET(req: Request, { params }: Params) {
  const imageName = params.imageName;

  try {
    const imagePath = join(process.cwd(), "/uploads/images", imageName);

    const imageBuffer = readFileSync(imagePath);

    return new Response(imageBuffer, {
      status: 200,
      headers: new Headers({
        "content-type": `image/${getType(imagePath)}`,
      }),
    });
  } catch (err) {
    return handleError(err);
  }
}
