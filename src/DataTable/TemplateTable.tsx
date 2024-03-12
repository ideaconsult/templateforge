// @ts-nocheck
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSetIsShosen } from "../store/store";
import { RowsIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const columns = [
  // {
  //   accessorKey: "uuid",
  //   header: ({ table }) => <>#</>,
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => {
  //         row.toggleSelected(!!value);
  //       }}
  //       aria-label="Select row"
  //     />
  //   ),
  // },

  {
    accessorKey: "template_name",
    header: "Template Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "template_author",
    header: "Template Author",
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableMultiRowSelection: false,
    state: {
      rowSelection,
      pagination,
      sorting,
    },
  });

  const setIdShosen = useSetIsShosen();
  useEffect(() => {
    setIdShosen(data && rowSelection ? data[rowSelection]?.uuid : null);
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
                onClick={() => setRowSelection(row.id)}
                className={row.id == rowSelection ? "selected" : "nonSelected"}
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
      <div className="pagination">
        <button
          className="paginBtn"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className="paginBtn"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
