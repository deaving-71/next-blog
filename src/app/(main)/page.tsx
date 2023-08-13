import Hero from "./Hero";
import { getAllArticles } from "@/utils/functions";
import ArticlesRowCategory from "./ArticlesRowCategory";

export default async function Home() {
  const data = await getAllArticles();
  return (
    <>
      <Hero data={data} />
      <section>
        <div className="pt-8">
          <ArticlesRowCategory
            data={data.articles.filter((_, idx) => idx !== 0 && idx < 5)}
            categoryName="Tech"
          />
        </div>
        <div className="pt-8">
          <ArticlesRowCategory
            data={data.articles.filter((_, idx) => idx !== 0 && idx < 5)}
            categoryName="Culture"
          />
        </div>
      </section>
    </>
  );
}
