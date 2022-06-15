import "./style.css";
import Header from "./components/Header";
import ItemsGrid from "./components/ItemsGrid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "./components/Search";

const hash = "9f77f3bd69f274fd4eacf5168498f51e";
const apiKey = "301ea58f9ae8b1187ed1ddbe3a3dd737";

const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (query === "") {
        if (
          localStorage.getItem("favorites") === "[]" ||
          !localStorage.getItem("favorites")
        ) {
          localStorage.setItem("favorites", "[]");
          const result = await axios(
            `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}`
          );
          setItems(result.data.data.results);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
        }
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=${apiKey}&hash=${hash}`
        );
        setItems(result.data.data.results);
      }
    };

    fetch();
  }, [query]);

  return (
    <>
      <Header />
      <Search search={q => setQuery(q)}></Search>
      <ItemsGrid items={items} />
    </>
  );
};

export default App;