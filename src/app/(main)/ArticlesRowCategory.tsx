import { Article } from "@/types/Article";
import { IMAGES_FOLDER } from "@/utils/constants";
import { getFormattedDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Article[];
  categoryName: string;
};

export default function ArticlesRowCategory({ data, categoryName }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-2">
        <h4 className="text-2xl font-semibold capitalize">{categoryName}</h4>
        <Link
          href="#"
          className="px-4 py-2 text-zinc-200 font-medium hover:bg-woodsmoke-900 border border-woodsmoke-900 rounded-md transition-all"
        >
          Browse Category
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.map(({ id, title, published, thumbnail }) => {
          return (
            <Link key={id} href={"#"} className="group">
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={`${IMAGES_FOLDER}/${thumbnail}`}
                    alt="Blog Post Thumbnail"
                    width={300}
                    height={200}
                    className="object-cover group-hover:scale-105 duration-300 ease-in-out transition-transform"
                  />
                </div>
                <div className="absolute bottom-3 text-sm left-5">
                  {getFormattedDate(published)}
                </div>
              </div>
              <h3 className="font-medium text-xl">{title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
