import React from "react";

import classes from "./Pagination.module.css";

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
      <ul className={classes.pagination}>
        <li
          className={`${classes["page-item"]} ${
            props.currentPage === 1 ? classes.disabled : ""
          } `}
        >
          <a className={classes["page-link"]} onClick={prevPage} href="!#">
            <span>Previous</span>
          </a>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`${classes["page-item"]} ${
              props.currentPage === pgNumber ? classes.active : ""
            } `}
          >
            <a
              onClick={() => props.setCurrentPage(pgNumber)}
              className={classes["page-link"]}
              href="!#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li
          className={`${classes["page-item"]} ${
            props.currentPage === props.nPages ? classes.disabled : ""
          } `}
        >
          <a className={classes["page-link"]} onClick={nextPage} href="!#">
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
