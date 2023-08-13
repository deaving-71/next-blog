"use client";

import z from "zod";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import ImageExt from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Image from "next/image";
import Status from "./Status";
import InputError from "./input-error";
import TextEditor from "../text-editor/text-editor";
import { useEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { sendArticle, updateArticle } from "@/utils/functions";
import { Article } from "@/types/Article";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { extractZodErrors, getChangedFields, getFormattedDate } from "@/utils";
import { useNotificationContext } from "@/context";

type Props = {
  article?: Article;
};

const schema = z.object({
  title: z.string().min(1, "Please enter your blog post title!"),
  thumbnail: z
    .custom<FileList>()
    .transform((file) => file?.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
      message: "Image size must be a maximum of 1MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed.",
    }),
  content: z.string().min(1, "Content cannot be empty"),
  category: z.string().min(1, "Please enter your blog post category!"),
  keywords: z
    .array(z.string())
    .min(1, { message: "Please enter at least one keyword." }),
});

export type ArticleForm = z.infer<typeof schema>;

export default function ArticleForm({ article }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prevArticle, setPrevArticle] = useState<Article | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>(article?.keywords ?? []);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ArticleForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title ?? "",
      content: article?.content ?? "<p>Type something here</p>",
      category: article?.category ?? "",
      keywords: article?.keywords ?? [],
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      ImageExt,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: article?.content ?? "<p>Type something here</p>",
    onUpdate: ({ editor }) =>
      setValue("content", editor.getHTML(), { shouldValidate: true }),
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  const { displayNotification } = useNotificationContext();

  const onSubmit: SubmitHandler<ArticleForm> = async (data) => {
    try {
      setIsLoading(true);

      if (article) {
        const updates = getChangedFields(prevArticle, data);

        const newArticle = await updateArticle(
          {
            id: article.id,
            ...updates,
          },
          article?.thumbnail
        );

        setPrevArticle(newArticle);

        displayNotification({
          message: "Article updated.",
          type: "success",
        });
      } else {
        const response = await sendArticle(data);

        router.push(`/admin/manage-article/${response.id}`);

        displayNotification({
          message: "You have successfully saved your article",
          type: "success",
        });
      }
    } catch (err) {
      if (err && typeof err === "object" && "issues" in err) {
        const errors = extractZodErrors(
          new z.ZodError(err.issues as z.ZodIssue[])
        );

        Object.entries(errors).forEach(([name, value]) => {
          //! MIGHT CHANGE THIS TO A SWITCH STATEMENT
          //@ts-ignore
          setError(name, value);
        });
      } else if (err instanceof Error) {
        console.error(err.message);
        displayNotification({
          message: err.message ?? "Something went wrong",
          type: "error",
        });
      } else {
        console.error(err);
        displayNotification({ message: "Something went wrong", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * publish/unpublish the article
   */
  const changeArticleStatus = async () => {
    try {
      setIsLoading(true);

      const status = article?.status === "Published" ? "Draft" : "Published";

      const newArticle = await updateArticle({
        id: article?.id,
        status: status,
      });

      setPrevArticle(newArticle);

      displayNotification({
        message: `Article ${
          status == "Published" ? "published" : "unpublished"
        }.`,
        type: "success",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const fileCopy = new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (!e.target) return;

      setImagePreview(e.target.result as string);
    };
    reader.readAsDataURL(fileCopy);
  };

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const keyword = e.currentTarget.value;

    if (keyword.length < 0) return;

    setKeywords((prev) => [...prev, keyword.trim()]);

    e.currentTarget.value = "";
  }

  function removeKeyword(keywordId: number) {
    setKeywords((prev) => prev.filter((_, idx) => idx !== keywordId));
  }

  useEffect(() => {
    register("content");
    register("keywords");
  }, [register]);

  useEffect(() => {
    setValue("keywords", keywords);
  }, [setValue, keywords]);

  useEffect(() => {
    if (article) setPrevArticle(article);
  }, [article]);

  if (!editor) return;

  return (
    <div className="h-full">
      <form
        className="rounded-xl h-full border-port-gore-600 border grid grid-rows-[auto,1fr] grid-cols-[1fr,auto] overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* FORM HEADER */}
        <div className="flex justify-end bg-port-gore-600 rounded-t-xl py-2 px-8 col-span-2">
          {article && (
            <Button
              type="button"
              className="bg-white text-woodsmoke-950 font-semibold hover:bg-gray-200 transition-all h-8 mr-6"
              onClick={changeArticleStatus}
              disabled={isLoading}
            >
              {article?.status === "Published" ? "Unpublish" : "Publish"}
            </Button>
          )}
          <Button
            className="bg-white text-woodsmoke-950 font-semibold hover:bg-gray-200 transition-all h-8"
            disabled={isLoading}
          >
            Save
          </Button>
        </div>

        {/* FORM CONTENT EDITOR */}
        <div className="p-8">
          <div className="h-full max-w-[800px] mx-auto">
            {errors.content && <InputError error={errors.content?.message} />}
            <TextEditor editor={editor} />
          </div>
        </div>

        {/* FORM SIDEBAR */}
        <aside className="w-[300px] bg-woodsmoke-900 p-4 overflow-auto">
          <div className="mb-4">
            Status: <Status status={article?.status} />
          </div>
          {article?.status === "Published" && (
            <div className="mb-4">
              Published on: {getFormattedDate(article?.published)}
            </div>
          )}
          {article?.createdAt && (
            <div className="mb-4">
              Created at: {getFormattedDate(article?.createdAt)}
            </div>
          )}

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-zinc-800 mb-4"></div>

          <label htmlFor="title" className="block mb-1">
            <div className="text-white font-semibold rounded mb-2">Title</div>
            <Input
              className="bg-woodsmoke-950 text-zinc-300 border-port-gore-950 hover:border-port-gore-800 focus:border-port-gore-800 active:border-port-gore-800 placeholder:text-sm focus-visible:ring-transparent focus-visible:ring-offset-transparent w-[260px]"
              aria-invalid={errors.title ? "true" : "false"}
              placeholder="Enter your post title..."
              {...register("title")}
            />
          </label>
          {errors.title && <InputError error={errors.title?.message} />}
          <label htmlFor="thumbnail" className="block mb-2">
            <div className="text-white font-semibold rounded mb-1">
              Thumbnail
            </div>
            <Input
              className="bg-woodsmoke-950 text-zinc-300 border-port-gore-950 hover:border-port-gore-800 focus:border-port-gore-800 active:border-port-gore-800 placeholder:text-sm focus-visible:ring-transparent focus-visible:ring-offset-transparent w-[260px]"
              type="file"
              {...register("thumbnail")}
              onChange={handleThumbnailChange}
            />
          </label>
          {errors.thumbnail && <InputError error={errors.thumbnail?.message} />}
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image
              src={
                imagePreview
                  ? imagePreview
                  : article?.thumbnail
                  ? `/uploads/images/${article?.thumbnail}`
                  : "/uploads/images/placeholder-image.jpg"
              }
              alt="Article Thumbnail"
              width={268}
              height={180}
              className="object-cover w-[268px] h-[180px]"
            />
          </div>
          <label htmlFor="category" className="block mb-2">
            <div className="text-white font-semibold mb-1">Category</div>
            <Input
              className="bg-woodsmoke-950 text-zinc-300 border-port-gore-950 hover:border-port-gore-800 focus:border-port-gore-800 active:border-port-gore-800 placeholder:text-sm focus-visible:ring-transparent focus-visible:ring-offset-transparent"
              placeholder="Enter your post category"
              {...register("category")}
            />
          </label>
          {errors.category && <InputError error={errors.category?.message} />}
          <div className="mb-2">
            <label htmlFor="keywords" className="text-white font-semibold mb-1">
              Keywords
            </label>
            <ul className="bg-woodsmoke-950 text-zinc-300 border-port-gore-950 hover:border-port-gore-800 focus:border-port-gore-800 active:border-port-gore-800">
              {keywords.map((keyword, idx) => (
                <li
                  key={idx}
                  className="rounded-xl bg-blue-700 px-3 py-[0.125rem] whitespace-nowrap"
                >
                  {keyword}
                  <button
                    type="button"
                    className="hover:text-red-500 transition-all ml-2 text-[0.75rem]"
                    onClick={() => removeKeyword(idx)}
                  >
                    <span>&#10005;</span>
                  </button>
                </li>
              ))}
              <li>
                <input
                  className="bg-transparent outline-none placeholder:text-sm"
                  placeholder="Enter a keyword"
                  onKeyDown={(e) => handleOnKeyDown(e)}
                />
              </li>
            </ul>
          </div>
          {errors.keywords && <InputError error={errors.keywords?.message} />}
        </aside>
      </form>
    </div>
  );
}
