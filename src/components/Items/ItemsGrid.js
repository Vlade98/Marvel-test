import React from "react";
import CharacterItem from "./Item";
import "./ItemsGrid.css";

const ItemsGrid = props => {
  return props.isLoading ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <>
      <div className={!props.results ? "message active" : "message"}>
        <p>No search results for '{props.searchText}'</p>
      </div>

      <section className="items-grid">
        {props.items.map(item => (
          <CharacterItem
            key={item.id}
            item={item}
            setIsFavorites={props.setIsFavorites}
          ></CharacterItem>
        ))}
      </section>
    </>
  );
};

export default ItemsGrid;
