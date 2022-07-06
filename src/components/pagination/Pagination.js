import React from "react";
import "./Pagination.css";

const Pagination = props => {
  const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (props.currentPage !== props.nPages)
      props.setCurrentPage(props.currentPage + 1);
  };

  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };

  return props.results ? (
    <nav>
      <ul className="pagination">
        <li
          className={`page-item ${props.currentPage === 1 ? "disabled" : ""} `}
        >
          <a className="page-link" onClick={prevPage} href="!#">
            <span>Previous</span>
          </a>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`page-item ${
              props.currentPage === pgNumber ? "active" : ""
            } `}
          >
            <a
              onClick={() => props.setCurrentPage(pgNumber)}
              className="page-link"
              href="!#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            props.currentPage === props.nPages ? "disabled" : ""
          } `}
        >
          <a className="page-link" onClick={nextPage} href="!#">
            <span>Next</span>
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    ""
  );
};

export default Pagination;
