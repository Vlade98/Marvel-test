import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/header/Header";
import ItemsGrid from "./components/Items/ItemsGrid";
import Search from "./components/search/Search";
import Pagination from "./components/pagination/Pagination";
import axios from "axios";

const hash = "9f77f3bd69f274fd4eacf5168498f51e";
const apiKey = "301ea58f9ae8b1187ed1ddbe3a3dd737";

const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetch = setTimeout(async () => {
      setLoading(true);
      const pages = res => {
        setTotalPages(Math.ceil(res.length / ITEMS_PER_PAGE));
      };
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
          pages(result.data.data.results);
          setLoading(false);
          setResults(true);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
          setIsFavorites(true);
          setLoading(false);
          pages(favorite);
          setResults(true);
        }
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&limit=100&apikey=${apiKey}&hash=${hash}`
        );
        pages(result.data.data.results);
        if (result.data.data.results.length === 0) {
          setItems(result.data.data.results);
          setLoading(false);
          setResults(false);
        } else {
          setItems(result.data.data.results);
          setIsFavorites(false);
          setLoading(false);
          setResults(true);
        }
      }
      setSearchText(query, isFavorites);
    }, 500);

    return () => {
      clearTimeout(fetch);
    };
  }, [query, isFavorites]);

  const handleClick = data => {
    setPage(data.selected + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <Search search={q => setQuery(q)}></Search>
      <ItemsGrid
        items={items}
        isFavorites={isFavorites}
        setIsFavorites={setIsFavorites}
        isLoading={isLoading}
        results={results}
        page={page}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        searchText={searchText}
      />
      <Pagination
        totalPages={totalPages}
        handleClick={handleClick}
        results={results}
      />
    </>
  );
};

export default App;
