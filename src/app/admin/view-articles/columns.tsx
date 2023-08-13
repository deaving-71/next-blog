"use client";

import { Article } from "@/types/Article";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => (
      <div>
        {row.getValue<string[]>("keywords").map((keyword, idx) => (
          <span
            key={idx}
            className="px-2 py-1 h-3 bg-port-gore-300 text-port-gore-600 rounded-xl mr-1"
          >
            {keyword}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<"Draft" | "Published">("status");
      switch (status) {
        case "Draft":
          return (
            <div className="font-medium">
              <span className="rounded-xl py-1 px-2 bg-red-300 text-red-600">
                Draft
              </span>
            </div>
          );

        case "Published":
          return (
            <div className="font-medium">
              <span className="rounded-xl py-1 px-2 bg-green-300 text-green-600">
                Published
              </span>
            </div>
          );
      }
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const article = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 hover:bg-woodsmoke-900 hover:text-zinc-200 data-[state=open]:bg-woodsmoke-900 border-none"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-woodsmoke-950 border border-woodsmoke-800 text-zinc-200 "
          >
            <DropdownMenuItem
              className="focus:bg-woodsmoke-900 focus:text-zinc-200 font-medium focus:font-medium"
              onClick={() => console.log(article.id)}
            >
              Preview Article
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-woodsmoke-900 focus:text-zinc-200 font-medium focus:font-medium"
              asChild
            >
              <Link href={`/admin/manage-article/${article.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-woodsmoke-800" />
            <DropdownMenuItem className="focus:bg-woodsmoke-900 focus:text-zinc-200 font-medium focus:font-medium">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
