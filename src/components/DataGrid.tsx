import { useState } from "react";
import Loading from "./Loading";
import ShowError from "./ShowError";
import { debounce } from "../utils/utils";
interface Column {
  name: string;
  title: string;
  filterPredicate?: (str: string) => void;
  customFilterInput?: JSX.Element;
}

interface DataGridProps {
  columns: Column[];
  data: any[];
  error?: {
    message: string;
  };
  loading?: boolean;
  justifyFilterBtn?: "start" | "end";
  renderCell?: (
    columnName: string,
    columnValue: string | boolean | number,
    key: string
  ) => React.ReactElement;
}

interface RenderCellProps {
  key: string;
  value: string;
  fontSize?: "xs" | "sm" | "base" | "lg";
}

const RenderCell = ({ key, value, fontSize = "base" }: RenderCellProps) => (
  <td key={key} className={`px-6 py-4 whitespace-nowrap text-${fontSize}`}>
    {value}
  </td>
);

const defaultRenderCell = (columnName: string, value: any, key: string) => (
  <RenderCell key={key} value={value} fontSize="sm" />
);

const DataGrid: React.FC<DataGridProps> = ({
  columns,
  data,
  error,
  loading,
  justifyFilterBtn = "end",
  renderCell = defaultRenderCell,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="flex flex-col">
      {columns.some(({ filterPredicate }) => !!filterPredicate) && (
        <div className={`w-full mb-2 flex justify-${justifyFilterBtn}`}>
          <button
            className="bg-gray-100 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 focus:outline-none transition duration-150 ease-in-out"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>
      )}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(
                    (
                      { title, name, filterPredicate, customFilterInput },
                      index
                    ) => {
                      const debouncedFilter = debounce(
                        (event: any) =>
                          !!filterPredicate &&
                          filterPredicate(event.target.value),
                        300
                      );
                      return (
                        <th
                          key={`${title}_${index}`}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex flex-col">
                            {title}
                            {showFilters && customFilterInput}
                            {showFilters &&
                              !customFilterInput &&
                              !!filterPredicate && (
                                <input
                                  id={`${name}_${index}`}
                                  name={name}
                                  className="block mt-1 w-full px-3 py-1 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                  onChange={debouncedFilter}
                                />
                              )}
                            {showFilters &&
                              !customFilterInput &&
                              !filterPredicate && (
                                <span className="block mt-1 w-full px-3 py-1 placeholder-gray-400 transition duration-150 ease-in-out rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                                  -
                                </span>
                              )}
                          </div>
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan={columns.length}>
                      <Loading />
                    </td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="px-4 py-4 flex-wrap">
                        <ShowError error={error} />
                      </div>
                    </td>
                  </tr>
                )}
                {!loading &&
                  data.map((row) => {
                    return (
                      <tr key={row._id || row.id}>
                        {columns.map(({ name }, index) =>
                          renderCell(name, row[name], `${name}_${index}`)
                        )}
                      </tr>
                    );
                  })}
                {!loading && !error && data.length === 0 && (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="flex flex-row justify-center py-3">
                        <svg
                          className="w-6 h-6 mr-5"
                          fill="none"
                          stroke="red"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <svg
                          className="w-6 h-6 mr-5"
                          fill="none"
                          stroke="red"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                          />
                        </svg>
                        <span>No Data</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
