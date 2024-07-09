// @ts-nocheck
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { RowsIcon } from "lucide-react";
import { useSetIsShosen } from "../store/store";
import { ontLookup } from "./CategoryLookUp";

const columns = [
  {
    accessorKey: "uuid",
    header: "UUID",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "template_name",
    header: "Template Name",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "template_author",
    header: "Template Author",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "METHOD",
    header: "Method",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "template_acknowledgment",
    header: "Acknowledgment",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "PROTOCOL_CATEGORY_CODE",
    header: "Category",
    cell: (props) => ontLookup(props.getValue()),
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: (props) => <>{props.getValue().slice(0, 10)}</>,
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
    autoResetPageIndex: false,
    state: {
      pagination,
      sorting,
      globalFilter: filtering,
      rowSelection,
    },
    initialState: {
      columnVisibility: {
        uuid: false,
      },
    },
  });

  const setIdShosen = useSetIsShosen();
  useEffect(() => {
    setIdShosen(data && rowSelection ? data[rowSelection]?.uuid : null);
  }, [rowSelection, pagination]);

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
          {/* {console.log(table.getRowModel().rows[0]?.original?.uuid)} */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tbody>
                <tr
                  key={RowsIcon.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setRowSelection(row.id);
                  }}
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
              </tbody>
            ))
          ) : (
            <p style={{ paddingLeft: "12px", color: "rgb(137 137 137)" }}>
              Sorry, no search result
            </p>
          )}
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
      <hr style={{ border: "1px solid #e4e4e4", marginTop: "1rem" }} />
    </div>
  );
}
