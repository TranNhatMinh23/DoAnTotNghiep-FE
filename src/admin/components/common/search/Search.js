import React from 'react';
import Search from 'antd/lib/input/Search'; 

export default function SearchComponent({
  placeholder,
  onSearch,
}) {
  const onKeyUpSearchWrapper = (e) => onSearch && onSearch(e.target.value);
  const onSearchWrapper = (value) => onSearch && onSearch(value);
  return (
    <Search
      placeholder={placeholder ? placeholder : "Search ..."}
      onKeyUp={onKeyUpSearchWrapper}
      onSearch={onSearchWrapper}
      style={{ width: 200 }}
    />
  )
}