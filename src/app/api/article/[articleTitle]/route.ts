import Article from "@/lib/models/article";
import dbConnect from "@/lib/mongoose";
import { handleError } from "../../handle-error";
import z from "zod";

type Params = { params: { articleTitle: string } };

export async function GET(req: Request, { params }: Params) {
  try {
    const articleTitle = z
      .string({
        invalid_type_error: "Invalid article title",
        required_error: "Invalid article title",
      })
      .parse(params.articleTitle);

    await dbConnect();

    const article = await Article.findOne({
      title: articleTitle,
      status: "Published",
    });

    if (!article) {
      return new Response(
        JSON.stringify({ message: "Could not fetch article" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
