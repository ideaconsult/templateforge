import React from "react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Template = {
  uri: string;
  uuid: string;
  METHOD: string;
  timestamp: string;
  PROTOCOL_CATEGORY_CODE: string;
  EXPERIMENT: string;
  template_name: string;
  template_status: string;
  template_author: string;
  template_acknowledgment: string;
};

export const columns: ColumnDef<Template>[] = [
  {
    accessorKey: "uuid",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "template_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Template Name
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "METHOD",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "template_acknowledgment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acknowledgment
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "PROTOCOL_CATEGORY_CODE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
