import type { Article } from "@/types/Article";

export async function getArticlesByFilters(
  page?: number,
  limit?: number
): Promise<{
  articles: Article[];
  articlesCount: number;
}> {
  const BASE_URL = `/api/articles?page=${page}&limit=${limit}`;

  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function getAllArticles(): Promise<{
  articles: Article[];
  articlesCount: number;
}> {
  const BASE_URL = `http://localhost:3000/api/articles?limit=${-1}`;

  const response = await fetch(BASE_URL, {
    next: { revalidate: 1000 * 60 * 5 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function getArticleById(id: string): Promise<Article> {
  if (!id) throw new Error(`Invalid article id`);

  const response = await fetch(`http://127.0.0.1:3000/api/articles/${id}`, {
    cache: "no-store",
  });

  if (!response.ok || response.status !== 200) {
    throw await response.json();
  }

  return await response.json();
}

export async function getArticleByTitle(title: string): Promise<Article> {
  if (!title) throw new Error(`Invalid article title`);

  const response = await fetch(`http://127.0.0.1:3000/api/article/${title}`, {
    cache: "no-store",
  });

  if (!response.ok || response.status !== 200) {
    throw await response.json();
  }

  return await response.json();
}
