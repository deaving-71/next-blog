import z from "zod";
import { DefaultModelProps } from "./DefaultModel";

export const ArticleSchema = z.object({
  title: z.string().min(1, "Please enter your blog post title!"),
  content: z.string().min(1, "Content cannot be empty"),
  thumbnail: z.string(),
  status: z
    .enum(["Published", "Draft"], {
      invalid_type_error: "Article status must either 'Published' or 'Draft'.",
    })
    .default("Draft"),
  category: z.string().min(1, "Please enter your blog post category!"),
  keywords: z
    .array(z.string())
    .min(1, { message: "Please enter at least one keyword." }),
  published: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema> & DefaultModelProps;

export const ImageSchema = z
  .custom<File>((file) => file, {
    message: "Please add an image.",
    path: ["thumbnail"],
  })
  .refine((file) => file && file.size <= 1 * 1024 * 1024, {
    message: "Image size must be a maximum of 1MB.",
    path: ["thumbnail"],
  })
  .refine((file) => file && file.type?.startsWith("image"), {
    message: "Only images are allowed.",
    path: ["thumbnail"],
  });
