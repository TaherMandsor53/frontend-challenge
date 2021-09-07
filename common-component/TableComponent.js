import React from 'react';

export default function TableComponent({ columnHeader, columnData }) {
  return (
    <div className="table-main">
      <table border="1">
        <tr>
          {columnHeader.map(item => {
            return <th>{item.label}</th>;
          })}
        </tr>
        {columnData.map(row => {
          return (
            <tr>
              {columnHeader.map(col => {
                return <td>{row[col.value]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
