import { File } from "buffer";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function uploadImage(
  file: File | null,
  imageName: string | null = null
) {
  if (!file) return;

  const buffer = await file.arrayBuffer();

  //TODO: filter the image .ext
  const fileName =
    imageName ?? `${Date.now()}_${file.name}_image.${getImageExt(file.type)}`;
  const uploadPath = join(process.cwd(), "/uploads/images", fileName);

  await writeFile(uploadPath, Buffer.from(buffer));

  return fileName;
}

function getImageExt(fileType: string) {
  switch (fileType) {
    case "image/jpeg":
      return "jpeg";

    case "image/jpg":
      return "jpg";

    case "image/png":
      return "png";

    case "image/webp":
      return "webp";
  }
}
