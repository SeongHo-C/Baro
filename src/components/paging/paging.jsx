import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';

const Paging = ({ onPageChange, totalElements, page, size }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={size}
      totalItemsCount={totalElements}
      pageRangeDisplayed={5}
      prevPageText={'⊲'}
      nextPageText={'⊳'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
