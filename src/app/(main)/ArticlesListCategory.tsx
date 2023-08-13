import { Article } from "@/types/Article";
import { IMAGES_FOLDER } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Article[];
};

export default function ArticlesListCategory({ data }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-6 pb-2">
        <h4 className="text-2xl font-semibold capitalize">Category</h4>
        <Link
          href="#"
          className="px-4 py-2 text-zinc-200 font-medium hover:bg-woodsmoke-900 border border-woodsmoke-900 rounded-md transition-all"
        >
          View All
        </Link>
      </div>
      {data.map(({ title, id, thumbnail }) => {
        return (
          <Link
            key={id}
            href={"#"}
            className="flex border-t border-t-woodsmoke-900 py-4 group"
          >
            <div className="overflow-hidden rounded-lg mr-4">
              <Image
                src={`${IMAGES_FOLDER}/${thumbnail}`}
                alt="Blog Post Thumbnail"
                width={120}
                height={100}
                className="object-cover group-hover:scale-105 duration-300 ease-in-out transition-transform"
              />
            </div>
            <h3 className="font-medium text-lg">{title}</h3>
          </Link>
        );
      })}
    </>
  );
}
