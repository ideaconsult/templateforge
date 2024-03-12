// @ts-nocheck
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSetIsShosen } from "../store/store";
import { RowsIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const columns = [
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
    header: "Template Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "METHOD",
    header: "Method",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "template_acknowledgment",
    header: "Acknowledgment",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "PROTOCOL_CATEGORY_CODE",
    header: "Category",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

export default function TemplateTable({ data }) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      rowSelection,
    },
  });

  const setIdShosen = useSetIsShosen();
  useEffect(() => {
    setIdShosen(
      data && Object.keys(rowSelection)[0]
        ? data[Object.keys(rowSelection)[0]].uuid
        : null
    );
  }, [rowSelection]);

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row) => (
              <tr
                key={RowsIcon.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
