import dbConnect from "@/lib/mongoose";
import Article from "@/lib/models/article";

import z from "zod";
import { formDataToObject } from "@/utils";
import uploadImage from "./upload-image";
import { handleError } from "../handle-error";
import { ArticleSchema, ImageSchema } from "@/types/Article";

export async function GET(req: Request) {
  /**
   * @param value the value to be converted to a number
   * @param backup if value is null return this instead
   * searchParams.get() returns string | null
   */

  function getFormattedSearchParam(value: string | null, backup: number) {
    if (!value) {
      return backup;
    }
    return +value;
  }

  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = getFormattedSearchParam(searchParams.get("page"), 0);
    const limit = getFormattedSearchParam(searchParams.get("limit"), 10);

    const articles =
      limit !== -1
        ? await Article.find()
            .skip(page * limit)
            .limit(limit)
        : await Article.find().select("-content");

    if (!articles) {
      return new Response("Could not fetch document", { status: 400 });
    }

    const articlesCount = await Article.estimatedDocumentCount();

    return new Response(JSON.stringify({ articles, articlesCount }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new Response(`Something went wrong\nreason: ${err}`, {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const data = formDataToObject(formData);

    const file = formData.get("thumbnail");

    const image = ImageSchema.parse(file);

    const imageName = await uploadImage(image);

    const article = ArticleSchema.parse({ ...data, thumbnail: imageName });

    await dbConnect();

    const newArticle = await Article.create(article);

    return new Response(JSON.stringify(newArticle), {
      status: 201,
    });
  } catch (err) {
    return handleError(err);
  }
}
