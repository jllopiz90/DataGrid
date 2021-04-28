interface Column {
    name: string;
    title: string;
}

interface DataGridProps {
    columns: Column[];
    data: any[];
    renderCell: (columnName: string, columnValue: string | boolean | number, key: string) => React.ReactElement;
}

const DataGrid: React.FC<DataGridProps> = ({ columns, data, renderCell }) => {
    return (
        <div className="flex flex-col bg-white">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map(({ title }, index) => (
                                        <th
                                            key={`${title}_${index}`}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((row) => {
                                    return (
                                        <tr key={row._id || row.id}>
                                            {columns.map(({ name }, index) =>
                                                renderCell(name, row[name], `${name}_${index}`),
                                            )}
                                        </tr>
                                    );
                                })}
                                {data.length === 0 && (
                                    <tr className="flex py-10 justify-center ml-5">
                                        <td colSpan={columns.length} className="flex flex-row">
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
