import ArticleForm from "@/components/admin/forms/ArticleForm";
import { getArticleById } from "@/utils/functions";
import { Suspense } from "react";

export default async function UpdateArticle({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await getArticleById(params.articleId);

  return (
    <main className="rounded-xsm">
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleForm article={article} />
      </Suspense>
    </main>
  );
}
