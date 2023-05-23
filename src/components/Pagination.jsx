import React from "react";
// import pagination
import Pagination from "react-js-pagination";

const DefinePagination = ({ total, position, currentPage, perPage, onChange}) => {
  return (
    total > 0 && (
      <Pagination
        innerClass={`pagination pagination-sm justify-content-${position} mb-0 mt-3`}
        activePage={currentPage}
        activeClass="page-item active"
        itemsCountPerPage={perPage}
        totalItemsCount={total}
        onChange={onChange}
        itemClasss="page-item"
        linkClass="page-link"
      />
    )
  );
};

export default DefinePagination;
