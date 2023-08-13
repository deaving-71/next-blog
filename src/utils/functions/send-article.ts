import type { ArticleForm } from "@/components/admin/forms/ArticleForm";
import type { Article } from "@/types/Article";
import { objectToFormData } from "../format";

export default async function sendArticle(
  article: ArticleForm
): Promise<Article> {
  const formData = objectToFormData(article);

  formData.forEach((value, key) => {
    console.log(key, value);
  });
  const response = await fetch("/api/articles", {
    method: "POST",
    body: formData,
  });

  if (response.status === 400) throw await response.json();

  if (!response.ok || response.status !== 201) throw await response.json();

  return await response.json();
}
