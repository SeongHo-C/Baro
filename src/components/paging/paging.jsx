import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';

const Paging = ({ onPageChange, totalElements, page }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={8}
      totalItemsCount={totalElements}
      pageRangeDisplayed={5}
      prevPageText={'⊲'}
      nextPageText={'⊳'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
