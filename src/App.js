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
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(12);

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
          setResults(true);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
          setIsFavorites(true);
          setLoading(false);
          setResults(true);
        }
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&limit=100&apikey=${apiKey}&hash=${hash}`
        );
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

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = items.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const nPages = Math.ceil(items.length / charactersPerPage);

  const handleClick = page => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <Search search={q => setQuery(q)}></Search>
      <ItemsGrid
        items={currentCharacters}
        setIsFavorites={setIsFavorites}
        isLoading={isLoading}
        results={results}
        searchText={searchText}
      />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={handleClick}
        results={results}
      />
    </>
  );
};

export default App;
