import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import initialData from "../Database";

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentIssueId, setCurrentIssueId] = useState(null);
  const [columnFilters, setColumnFilters] = useState({});

  const handleIssueIdClick = (id) => {
    setShowDialog(true);
    setCurrentIssueId(id);
  };

  const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`Search...`}
        className="p-2 border rounded"
      />
    );
  };

  const handleToggleFilter = (columnId, value) => {
    setColumnFilters((prev) => {
      const currentFilters = prev[columnId] || {};
      currentFilters[value] = !currentFilters[value];
      return {
        ...prev,
        [columnId]: currentFilters,
      };
    });
  };

  const filterData = (data) => {
    let filteredData = [...data];
    Object.keys(columnFilters).forEach((columnId) => {
      const filters = columnFilters[columnId];
      const activeFilters = Object.keys(filters).filter((key) => filters[key]);
      if (activeFilters.length > 0) {
        filteredData = filteredData.filter((row) =>
          activeFilters.includes(row[columnId])
        );
      }
    });
    return filteredData;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Channel Name",
        accessor: "channelName",
        Filter: ({ column: { id, preFilteredRows } }) => {
          const [isOpen, setIsOpen] = useState(false);
          const uniqueValues = useMemo(() => {
            const values = new Set();
            preFilteredRows.forEach((row) => values.add(row.values[id]));
            return [...values];
          }, [preFilteredRows, id]);

          return (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border rounded"
              >
                {isOpen ? "Hide Filters" : "Show Filters"}
              </button>
              {isOpen && (
                <div className="mt-2">
                  {uniqueValues.map((value) => (
                    <div key={value} className="flex items-center">
                      <button
                        onClick={() => handleToggleFilter(id, value)}
                        className={`mr-2 ${
                          columnFilters[id] && columnFilters[id][value]
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {columnFilters[id] && columnFilters[id][value]
                          ? "-"
                          : "+"}
                      </button>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "App Name",
        accessor: "appName",
        Filter: ({ column: { id, preFilteredRows } }) => {
          const [isOpen, setIsOpen] = useState(false);
          const uniqueValues = useMemo(() => {
            const values = new Set();
            preFilteredRows.forEach((row) => values.add(row.values[id]));
            return [...values];
          }, [preFilteredRows, id]);

          return (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border rounded"
              >
                {isOpen ? "Hide Filters" : "Show Filters"}
              </button>
              {isOpen && (
                <div className="mt-2">
                  {uniqueValues.map((value) => (
                    <div key={value} className="flex items-center">
                      <button
                        onClick={() => handleToggleFilter(id, value)}
                        className={`mr-2 ${
                          columnFilters[id] && columnFilters[id][value]
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {columnFilters[id] && columnFilters[id][value]
                          ? "-"
                          : "+"}
                      </button>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Severity",
        accessor: "severity",
        Filter: ({ column: { id, preFilteredRows } }) => {
          const [isOpen, setIsOpen] = useState(false);
          const uniqueValues = useMemo(() => {
            const values = new Set();
            preFilteredRows.forEach((row) => values.add(row.values[id]));
            return [...values];
          }, [preFilteredRows, id]);

          return (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border rounded"
              >
                {isOpen ? "Hide Filters" : "Show Filters"}
              </button>
              {isOpen && (
                <div className="mt-2">
                  {uniqueValues.map((value) => (
                    <div key={value} className="flex items-center">
                      <button
                        onClick={() => handleToggleFilter(id, value)}
                        className={`mr-2 ${
                          columnFilters[id] && columnFilters[id][value]
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {columnFilters[id] && columnFilters[id][value]
                          ? "-"
                          : "+"}
                      </button>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        },
        Cell: ({ cell: { value } }) => {
          const severityMapping = {
            Low: { label: "1", color: "bg-green-100 text-green-800" },
            Medium: { label: "2", color: "bg-yellow-100 text-yellow-800" },
            High: { label: "3", color: "bg-orange-100 text-orange-800" },
            Critical: { label: "4", color: "bg-red-100 text-red-800" },
          };
          return (
            <span
              className={`px-2 py-1 rounded ${severityMapping[value].color}`}
            >
              {severityMapping[value].label}
            </span>
          );
        },
      },
      {
        Header: "Issue Id",
        accessor: "issueId",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => handleIssueIdClick(value)}
            className="text-blue-500 hover:underline"
          >
            {value}
          </button>
        ),
      },
    ],
    [columnFilters]
  );

  const filteredData = useMemo(
    () => filterData(initialData),
    [initialData, columnFilters]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0 },
      defaultColumn: { Filter: ColumnFilter },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="flex flex-col items-center w-full p-4">
      <button
        onClick={() => window.location.reload()}
        className="p-2 border rounded mb-4"
      >
        Refresh
      </button>
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search all..."
        className="p-2 border rounded w-1/2"
      />
      <table
        {...getTableProps()}
        className="w-4/5 mx-auto border-collapse border"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 border text-left bg-gray-200"
                >
                  <div className="flex justify-between">
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.canSort ? (
                        <button>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : " ⏺"}
                        </button>
                      ) : null}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="even:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {">>"}
        </button>{" "}
        <span className="flex items-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="flex items-center">
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="p-1 border rounded w-12 text-center"
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="p-1 border rounded"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-2">Severity Legend</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-100 border rounded mr-2"></span>
            <span>1 - Low</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-100 border rounded mr-2"></span>
            <span>2 - Medium</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-orange-100 border rounded mr-2"></span>
            <span>3 - High</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-100 border rounded mr-2"></span>
            <span>4 - Critical</span>
          </div>
        </div>
      </div>
      {showDialog && <Dialog onClose={() => setShowDialog(false)} />}
    </div>
  );
};

export default Dashboard;
