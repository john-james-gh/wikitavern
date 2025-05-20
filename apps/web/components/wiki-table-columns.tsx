"use client"

import {ColumnDef} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"

import {Badge} from "@workspace/ui/components/badge"
import {Button} from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import type {PAGES_BY_USER_QUERYResult} from "@/types/sanity"
import type {Database} from "@/types/supabase"

import {RequestSubmissionChangesButton} from "./request-submission-changes-button"

export const cmsColumns: ColumnDef<PAGES_BY_USER_QUERYResult>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    cell: ({cell}) => {
      const date = cell.getValue() as string | null
      if (!date) return "N/A"
      return new Date(date).toLocaleString()
    },
  },
]

export const dbColumns: ColumnDef<Database["public"]["Tables"]["wiki_submissions"]["Row"]>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({cell}) => {
      const status = cell.getValue() as Database["public"]["Enums"]["wiki_status"]
      return <Badge variant={status === "pending" ? "secondary" : "default"}>{status}</Badge>
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-right">Created At</div>,
    cell: ({cell}) => {
      const date = cell.getValue() as string | null
      if (!date) return "N/A"
      return <div className="text-right">{new Date(date).toLocaleString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const wiki = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <RequestSubmissionChangesButton wiki={wiki} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
