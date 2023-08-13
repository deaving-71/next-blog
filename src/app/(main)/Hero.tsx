import Image from "next/image";
import Link from "next/link";
import ArticlesListCategory from "./ArticlesListCategory";
import { Article } from "@/types/Article";
import { getFormattedDate } from "@/utils/format";
import { IMAGES_FOLDER } from "@/utils/constants";

type Props = {
  data: {
    articles: Article[];
    articlesCount: number;
  };
};

export default function Hero({ data }: Props) {
  return (
    <section className="flex">
      <div className="flex-1 p-6">
        <h4 className="text-2xl font-semibold mb-6 pb-2">Latest</h4>
        <Link href={`/${data.articles[0].title}`} className="group">
          <div className="overflow-hidden rounded-lg relative">
            <Image
              src={`${IMAGES_FOLDER}/${data.articles[0].thumbnail}`}
              alt="Blog Post Thumbnail"
              width={800}
              height={300}
              className="object-contain rounded-lg group-hover:scale-105 duration-300 ease-in-out transition-transform"
            />
            <div className="absolute bottom-3 left-5">
              {getFormattedDate(data.articles[0].published)}
            </div>
          </div>
          <h3 className="font-semibold text-3xl">{data.articles[0].title}</h3>
        </Link>
      </div>
      <div className="w-[420px] border-l border-l-woodsmoke-900 p-6">
        <ArticlesListCategory
          // pass only the articles with index in range of (1..4)
          data={data.articles.filter((_, idx) => idx !== 0 && idx < 6)}
        />
      </div>
    </section>
  );
}
