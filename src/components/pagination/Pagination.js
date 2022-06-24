import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = props => {
  return props.results ? (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={props.totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.handleClick}
      containerClassName={"pagination justify-content-center pagination-lg"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  ) : (
    ""
  );
};

export default Pagination;
