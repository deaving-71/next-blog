import z from "zod";
import { models, model, Schema, Model } from "mongoose";
import type { Article } from "@/types/Article";

const ArticleSchema = new Schema<Article>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please enter a title for the article!"],
    },
    thumbnail: {
      type: String,
      required: [true, "Please add an image."],
    },
    content: {
      type: String,
      required: [true, "Your article content cannot be empty!"],
    },
    category: {
      type: String,
      required: [true, "Your article category cannot be empty!"],
    },
    keywords: {
      type: [String],
      required: [true, "You must at least add one keyword!"],
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    published: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Duplicate the ID field (does not get stored in the DB).
ArticleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ArticleSchema.set("toJSON", { virtuals: true });

export default (models.articles as Model<Article>) ||
  model("articles", ArticleSchema);
