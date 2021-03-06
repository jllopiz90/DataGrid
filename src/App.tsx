import { useState } from 'react';
import "./App.css";
import DataGrid from "./components/DataGrid";
import { debounce } from './utils/utils';

const renderTestCells = (columnName: string, value: any, key: string) => {
  if (columnName === "isActive") {
    return (
      <td key={key} className="px-6 py-4 whitespace-nowrap">
        {value ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Yes
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
            No
          </span>
        )}
      </td>
    );
  }
  return (
    <td key={key} className="px-6 py-4 whitespace-wrap">
      {value}
    </td>
  );
};

const testData = [
  {
    name: "Tester Testerson Receive leads from LeadConduit and other sources, send them to TKA CRM & Contact Center, and distribute confirmed appointments in round robin mode over a list of API endpoints.",
    phone: "(111) 111-1111",
    isActive: false,
    address: "123 st test Av Miami Fl 33133",
  },
  {
    name: "Testerin Teststar",
    phone: "(222) 222-2222",
    isActive: true,
    address: "456 st test Av Miami Fl 33133",
  },
  {
    name: "Testerina IV",
    phone: "(333) 333-3333",
    isActive: false,
    address: "789 st test Av Miami Fl 33133",
  },
];

function App() {
  const [data, setData] = useState(testData);
  
  const filterName = (str: string) => {
    //@ts-ignore;
    // console.log('data',data)
    const dataFiltered = testData.filter((row) => row.name.toLowerCase().startsWith(str.toLowerCase()));
    console.log('str', str)
    // console.log('dataFiltered',dataFiltered)
    setData(dataFiltered);
  }

  const testColumns = [
    { name: "name", title: "Name", filterPredicate: filterName},
    { name: "phone", title: "Phone" },
    { name: "isActive", title: "Active" },
    { name: "address", title: "Adress" },
  ];
  return (
    <div className="flex flex-col justify-center items-center py-10 bg-gray-400">
      <span className="text-green-400 text-xl font-bold">Datagrid example</span>
      <div className="mt-10">
        <DataGrid
          columns={testColumns}
          data={data}
          renderCell={renderTestCells}
          loading={false}
          justifyFilterBtn="start"
        />
      </div>
    </div>
  );
}

export default App;
