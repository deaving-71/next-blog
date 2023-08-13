import { ArticleForm } from "@/components/admin/forms/ArticleForm";
import { Article } from "@/types/Article";

/**
 * compares the article in database with the form-data
 * @returns returns only the fields that have changed
 */

export function getChangedFields(
  prevArticle: Article | null,
  formData: ArticleForm
): ArticleForm | {} {
  if (!prevArticle) return {};

  const updates: Partial<ArticleForm> = {};

  if (formData.thumbnail) {
    updates["thumbnail"] = formData.thumbnail;
  }

  const keys = Object.keys(formData) as (keyof typeof formData)[];

  keys.forEach((key) => {
    if (key === "thumbnail") return;
    if (prevArticle[key] !== formData[key]) updates[key] = formData[key];
  });

  return updates;
}
