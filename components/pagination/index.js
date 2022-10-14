import React from "react";
import Pagination from "react-js-pagination";

const index = ({ activePage, totalItemsCount }) => {
  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
  };

  return (
    <div>
      <Pagination
        activePage={activePage}
        itemClass="page-item"
        linkClass="page-link"
        itemsCountPerPage={5}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind()}
      />
    </div>
  );
};

export default index;
