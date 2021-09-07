import React, { useEffect, useState } from 'react';
import TableComponent from '../common-component/TableComponent';
import constant from '../constants/constant';
import axios from 'axios';
import Transform from '../utils/Transform';

export default function Home() {
  const [userData, setUserData] = useState('');
  const [tableData, setTableData] = useState('');
  const [searchVal, setSearchVal] = useState('');

  //API function
  const fetchUserDetails = () => {
    let URL = `https://jsonplaceholder.typicode.com/users`;
    axios
      .get(URL)
      .then(data => {
        setUserData(data.data);
      })
      .catch(() => {
        console.log('API Error');
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const data = Transform.transformUserData(userData);

  //search function
  const filterColumns = ['name', 'city', 'company'];
  const onSearchChange = val => {
    const lowercasedValue = val.toLowerCase().trim();
    setSearchVal(lowercasedValue);
    if (lowercasedValue === '') {
      setTableData(data);
    } else {
      const filteredData =
        data &&
        data.filter(item => {
          return Object.keys(item).some(key =>
            filterColumns.includes(key) ? item[key].toString().toLowerCase().includes(lowercasedValue) : false,
          );
        });
      setTableData(filteredData);
    }
  };

  return (
    <div className="home-main">
      <div className="search-comp">
        <input
          type="search"
          onChange={e => onSearchChange(e.target.value)}
          value={searchVal}
          placeholder="Search by Name,City,Company"
          className="search-input"
        />
      </div>
      {data && data.length > 0 && (
        <TableComponent columnHeader={constant.columnHeaders} columnData={tableData || data} />
      )}
    </div>
  );
}
