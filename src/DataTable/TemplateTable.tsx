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
import SortingIcon from "@/IconsComponents/SortingIcon";

const columns = [
  {
    accessorKey: "uuid",
    header: "UUID",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "template_name",
    header: "Template Name",
    sortingFn: "textCaseSensitive",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "template_author",
    header: "Template Author",
    sortingFn: "textCaseSensitive",
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

  const [sorting, setSorting] = useState([{ id: "timestamp", desc: true }]);
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

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

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
              <tr key={headerGroup.headers.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    data-cy={header.column.columnDef.header}
                    className="thSorted"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.getIsSorted() === "asc" ||
                    header.column.getIsSorted() === "desc" ? (
                      <span className="thSorted-selected">
                        {header.column.columnDef.header}&nbsp;&nbsp;
                      </span>
                    ) : (
                      <span>{header.column.columnDef.header}&nbsp;&nbsp;</span>
                    )}
                    {/* {header.column.columnDef.header}&nbsp;&nbsp; */}
                    {header.column.getIsSorted() === "asc" && (
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          width="1.5"
                          height="12"
                          rx="0.75"
                          fill="#656CF6"
                        />
                        <rect
                          y="9.70709"
                          width="1.5"
                          height="5"
                          rx="0.75"
                          transform="rotate(-45 0 9.70709)"
                          fill="#656CF6"
                        />
                        <rect
                          width="1.5"
                          height="5"
                          rx="0.75"
                          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 7.59619 9.70709)"
                          fill="#656CF6"
                        />
                      </svg>
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="1.5"
                          height="12"
                          rx="0.75"
                          transform="matrix(1 0 0 -1 3 13.2426)"
                          fill="#656CF6"
                        />
                        <rect
                          width="1.5"
                          height="5"
                          rx="0.75"
                          transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 3.53552)"
                          fill="#656CF6"
                        />
                        <rect
                          x="7.59619"
                          y="3.53552"
                          width="1.5"
                          height="5"
                          rx="0.75"
                          transform="rotate(135 7.59619 3.53552)"
                          fill="#656CF6"
                        />
                      </svg>
                    )}
                    {/* {
                      { asc: "a ", desc: "d" }[
                        header.column.getIsSorted() ?? null
                      ]
                    } */}
                    {/* <SortingIcon /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* {console.log(table.getRowModel().rows[0]?.original?.uuid)} */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setRowSelection(row.id);
                  }}
                  className={
                    row.id == rowSelection ? "selected" : "nonSelected"
                  }
                >
                  {row.getVisibleCells().map((cell, y) => (
                    <td key={y}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr style={{ paddingLeft: "12px", color: "rgb(137 137 137)" }}>
                <td>Sorry, no search result</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pageCount > 2 ? (
        <div className="pagination">
          <button
            data-cy="previous-page"
            className="paginBtn"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <div className="paginationPageCount">
            <p>
              page{" "}
              <span data-cy="current-page-number" className="pageCurrent">
                {currentPage + 1}
              </span>{" "}
              of{" "}
              <span data-cy="all-page-number" className="pageCurrent">
                {pageCount}
              </span>
            </p>
          </div>
          <button
            data-cy="next-page"
            className="paginBtn"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      ) : null}
      <hr style={{ border: "1px solid #e4e4e4", marginTop: "1rem" }} />
    </div>
  );
}
