# Overview DataGrid Component

A really light and simple DataGrid component to display data in a table. Was created using create react app, typescript and tailwindcss.

## How to use

The component receive 3 props, all required, columns, data and renderCell. Below the description of each one of those props.

`columns`:

```typescript
columns: Column[]
Column: { 
  name: string,
  title: string,
  filterPredicate?: (str: string) => void;
  customFilterInput?: JSX.Element;
}
```

The name property of a column is the name of the property in the row object within the data.\
The title property is what will be displayed as column header in the table.\
The filterPredicate should be a function to place in the onChange of a search text input that will show up below the column header in case that is present in the column object and the filters are visible.\
The customFilterInput will replace the default text input for the search filter, the filterPredicate is not necessary to be present on this case because the custom input should be handling that logic, if both filterPredicate and customFilerInput are present the filterPredicate will be ignored.\


`data`:

data: any[]
This props will be the array containing the data the DataGrid will show.


`renderCell`:

renderCell: (columnName: string, columnValue: string | boolean | number, key: string) => React.ReactElement
renderCell is a function that will receive the column name and value and will display a cell for each element of the row.

## Example

```typescript
const columns = [
  { name: "name", title: "Name" },
  { name: "phone", title: "Phone" },
  { name: "isActive", title: "Active" },
  { name: "address", title: "Adress" },
];

const renderCells = (
  columnName: string,
  value: any,
  key: string
) => {
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
    <td key={key} className="px-6 py-4 whitespace-nowrap">
      {value}
    </td>
  );
};

const data = [
    {name: 'Tester Testerson', phone: '(111) 111-1111', isActive: false, address: '123 st test Av Miami Fl 33133'},
  {name: 'Testerin Teststar', phone: '(222) 222-2222', isActive: true, address: '456 st test Av Miami Fl 33133'},
  {name: 'Testerina IV', phone: '(333) 333-3333', isActive: false, address: '789 st test Av Miami Fl 33133'},
];

<DataGrid
    columns={testColumns}
    data={data}
    renderCell={renderTestCells}
/>
```

<img width="741" alt="Screen Shot 2021-05-07 at 2 45 29 PM" src="https://user-images.githubusercontent.com/17462829/117494881-ed5e1380-af42-11eb-83c1-723ef23ff741.png">

## Example with filters

```typescript
const renderCells = (
  columnName: string,
  value: any,
  key: string
) => {
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
    <td key={key} className="px-6 py-4 whitespace-nowrap">
      {value}
    </td>
  );
};

const data = [
    {name: 'Tester Testerson', phone: '(111) 111-1111', isActive: false, address: '123 st test Av Miami Fl 33133'},
  {name: 'Testerin Teststar', phone: '(222) 222-2222', isActive: true, address: '456 st test Av Miami Fl 33133'},
  {name: 'Testerina IV', phone: '(333) 333-3333', isActive: false, address: '789 st test Av Miami Fl 33133'},
];

const filterName = (str: string) => {
    //@ts-ignore;
    console.log('data',data)
    const dataFiltered = data.filter((row) => row.name.toLowerCase().startsWith(str.toLowerCase()));
    console.log('str', str)
    console.log('dataFiltered',dataFiltered)
    setData(dataFiltered);
  }

  const testColumns = [
    { name: "name", title: "Name", filterPredicate: filterName },
    { name: "phone", title: "Phone" },
    { name: "isActive", title: "Active" },
    { name: "address", title: "Adress" },
  ];

<DataGrid
    columns={testColumns}
    data={data}
    renderCell={renderTestCells}
/>
```

<img width="803" alt="Screen Shot 2021-05-07 at 2 42 52 PM" src="https://user-images.githubusercontent.com/17462829/117494941-05359780-af43-11eb-9f71-264cb3b7003a.png">
