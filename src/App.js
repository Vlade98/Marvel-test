import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/header/Header";
import ItemsGrid from "./components/ItemsGrid";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

import axios from "axios";

const hash = "9f77f3bd69f274fd4eacf5168498f51e";
const apiKey = "301ea58f9ae8b1187ed1ddbe3a3dd737";

const App = () => {
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetch = setTimeout(async () => {
      setLoading(true);
      if (query === "") {
        if (
          localStorage.getItem("favorites") === "[]" ||
          !localStorage.getItem("favorites")
        ) {
          localStorage.setItem("favorites", "[]");
          const result = await axios(
            `http://gateway.marvel.com/v1/public/characters?ts=1&limit=100&apikey=${apiKey}&hash=${hash}`
          );
          setItems(result.data.data.results);
          setLoading(false);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
          setIsFavorites(true);
          setLoading(false);
        }
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&limit=100&apikey=${apiKey}&hash=${hash}`
        );
        setItems(result.data.data.results);
        setIsFavorites(false);
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(fetch);
    };
  }, [query, isFavorites]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Search search={q => setQuery(q)}></Search>
      <ItemsGrid
        items={currentItem}
        isFavorites={isFavorites}
        setIsFavorites={setIsFavorites}
        isLoading={isLoading}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </>
  );
};

export default App;
