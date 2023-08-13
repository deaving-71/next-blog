import { getFormattedDate } from "@/utils";
import { getArticleByTitle } from "@/utils/functions";
import Image from "next/image";
import { sanitize } from "isomorphic-dompurify";

export default async function Article({
  params,
}: {
  params: { articleTitle: string };
}) {
  const article = await getArticleByTitle(params.articleTitle);
  return (
    <article className="p-8">
      <h1 className="text-4xl font-semibold">{article.title}</h1>
      <figure className="flex justify-center items-center mb-8">
        <Image
          src={`/uploads/images/${article.thumbnail}`}
          alt={article.title}
          width={1000}
          height={600}
          className="object-cover"
        />
        <div>{getFormattedDate(article.published)}</div>
      </figure>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(article.content) }}
      ></div>
    </article>
  );
}
