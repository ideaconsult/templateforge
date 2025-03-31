import React from "react";

export default function Pagination({
  table,
  currentPage,
  pageCount,
  enteredPageNumber,
  setEnteredPageNumber,
  handleKeyDown,
}) {
  return (
    <div className="pagination">
      <button
        data-cy="previous-page"
        className="paginBtn"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <div className="paginationPageCount">
        {currentPage < 2 ? null : (
          <button className="pageBtn" onClick={() => table.firstPage()}>
            1
          </button>
        )}
        {currentPage < 3 ? null : <p>...</p>}
        {currentPage > 0 ? (
          <div
            className="pageBtn"
            onClick={() => table.setPageIndex(currentPage - 1)}
          >
            {currentPage}
          </div>
        ) : null}
        <div className="pageCurrent">{currentPage + 1}</div>
        {currentPage + 2 > pageCount ? null : (
          <>
            <div
              className="pageBtn"
              onClick={() => table.setPageIndex(currentPage + 1)}
            >
              {currentPage + 2}
            </div>
            {pageCount - currentPage < 4 ? null : <p>...</p>}
          </>
        )}
        {pageCount - currentPage < 3 ? null : (
          <button className="pageBtn" onClick={() => table.lastPage()}>
            {pageCount}
          </button>
        )}
      </div>
      <input
        value={enteredPageNumber}
        onChange={(e) => setEnteredPageNumber(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pageNumberImput"
        type="text"
        placeholder="Page Number"
      />

      <button
        data-cy="next-page"
        className="paginBtn"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  );
}
