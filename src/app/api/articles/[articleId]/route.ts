import Article from "@/lib/models/article";
import dbConnect from "@/lib/mongoose";
import { formDataToObject } from "@/utils";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import uploadImage from "../upload-image";
import { ImageSchema } from "@/types/Article";
import { handleError } from "../../handle-error";

type Params = { params: { articleId: string } };

export async function GET(req: Request, { params }: Params) {
  const articleId = params.articleId;
  try {
    if (!isValidObjectId(articleId)) {
      return new Response("Invalid id format", { status: 400 });
    }
    await dbConnect();
    const article = await Article.findOne({ _id: articleId });
    if (!article) {
      return new Response(
        JSON.stringify({ message: "Could not fetch article" }),
        { status: 400 }
      );
    }
    return NextResponse.json(article);
  } catch (err) {
    return new Response(`Something went wrong\n reason: ${err}`, {
      status: 500,
    });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const articleId = params.articleId;
  try {
    if (!isValidObjectId(articleId)) {
      return new Response("Invalid id format", { status: 400 });
    }
    const formData = await req.formData();
    const updates = formDataToObject(formData);
    if ("status" in updates && updates.status === "Published")
      updates["published"] = new Date().toString();

    await dbConnect();
    const newArticle = await Article.updateOne({ _id: articleId }, updates);
    const image = formData.get("thumbnail");
    if (ImageSchema.safeParse(image).success) {
      await uploadImage(image as File, updates?.imageName);
    }
    return new Response(JSON.stringify(newArticle), { status: 200 });
  } catch (err) {
    handleError(err);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const articleId = params.articleId;
  try {
    if (!isValidObjectId(articleId)) {
      return new Response("Invalid id format", { status: 400 });
    }
    await dbConnect();
    await Article.deleteOne({ _id: articleId });
    return new Response("Success", { status: 200 });
  } catch (err) {
    return new Response(`Something went wrong\n reason: ${err}`, {
      status: 500,
    });
  }
}
