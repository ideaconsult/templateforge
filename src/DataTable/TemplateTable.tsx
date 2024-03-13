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
import SortingIcon from "../IconsComponents/SortingIcon";

const columns = [
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
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
    state: {
      rowSelection,
      pagination,
      sorting,
      globalFilter: filtering,
    },
  });

  const setIdShosen = useSetIsShosen();
  useEffect(() => {
    setIdShosen(data && rowSelection ? data[rowSelection]?.uuid : null);
  }, [rowSelection]);

  return (
    <div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search for Blueprints..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="thSorted"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.columnDef.header}
                    {/* {{ asc: " ", desc: "" }[header.column.getIsSorted() ?? null]}
                  <SortingIcon /> */}
                  </th>
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
                  className={
                    row.id == rowSelection ? "selected" : "nonSelected"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
