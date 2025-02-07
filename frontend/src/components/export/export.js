import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Export = () => {
  const [tableData, setTableData] = useState([

   ]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData); 
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users'); 
    XLSX.writeFile(wb, 'users.xlsx'); 
  };

  return (
    <div>
      <h1>Export Data to Excel Example</h1>
      <button onClick={exportToExcel}>Export to Excel</button>

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.full_name}</td>
              <td>{data.user_name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Export;
