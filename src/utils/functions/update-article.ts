import type { ArticleForm } from "@/components/admin/forms/ArticleForm";
import type { Article } from "@/types/Article";
import { DefaultModelProps } from "@/types/DefaultModel";
import { objectToFormData } from "../format";

type UpdatedFormData = Partial<ArticleForm> &
  DefaultModelProps & { status?: "Published" | "Draft" };

export default async function updateArticle(
  data: UpdatedFormData,
  imageName?: string
): Promise<Article> {
  const { id } = data;
  const formData = objectToFormData({ ...data, imageName });

  const response = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok || response.status !== 200)
    throw new Error(await response.text());

  return await response.json();
}
