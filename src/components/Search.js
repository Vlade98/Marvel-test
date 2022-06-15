import React, { useState } from "react";
import "./Search.css";

const Search = props => {
  const [text, setText] = useState("");

  const onSearch = q => {
    setText(q);
    props.search(q);
  };

  return (
    <form>
      <input
        type="text"
        className="search"
        placeholder="Find a character"
        autoFocus
        onChange={e => onSearch(e.target.value)}
        value={text}
      />
    </form>
  );
};

export default Search;
