"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getArticlesByFilters } from "@/utils/functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ViewArticles() {
  const queryClient = useQueryClient();
  const [querySettings, setQuerySettings] = useState({ page: 0, limit: 10 });

  function turnPage(pageIndex: number): void {
    setQuerySettings({
      page: querySettings.page + pageIndex,
      limit: querySettings.limit,
    });

    queryClient.invalidateQueries({
      queryKey: ["articles", querySettings.page, querySettings.limit],
    });
  }

  //! DISABLE (NEXT/PREV) GETTING NEXT PAGE WHILE LOADING DATA
  const { data } = useQuery({
    queryKey: ["articles", querySettings.page, querySettings.limit],
    queryFn: () =>
      getArticlesByFilters(querySettings.page, querySettings.limit),
    keepPreviousData: true,
    cacheTime: 5,
  });

  return (
    <main className="rounded-xsm">
      <DataTable
        columns={columns}
        data={data?.articles ?? []}
        pageCount={Math.round((data?.articlesCount ?? 0) / querySettings.limit)}
        nextPage={() => turnPage(1)}
        previousPage={() => {
          if (querySettings.page === 0) return;

          turnPage(-1);
        }}
        getCanNextPage={() =>
          Math.round((data?.articlesCount || 0) / querySettings.limit) <=
          querySettings.page
        }
        getCanPreviousPage={() => querySettings.page === 0}
      />
    </main>
  );
}
