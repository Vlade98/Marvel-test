import React from "react";
import CharacterItem from "./Item";
import "./ItemsGrid.css";

const ItemsGrid = props => {
  const Clear = () => {
    localStorage.clear();
    props.setIsFavorites(false);
  };

  const startIndex = (props.page - 1) * props.ITEMS_PER_PAGE;
  const selectedItems = props.items.slice(
    startIndex,
    startIndex + props.ITEMS_PER_PAGE
  );

  return props.isLoading ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <>
      <div
        className={
          props.isFavorites ? "favorites-title" : "favorites-title hidden"
        }
      >
        <h3 className="favorites-text">Favorite characters</h3>
        <button className="favorites-btn" onClick={() => Clear()}>
          Clear List
        </button>
      </div>

      <div className={!props.results ? "message active" : "message"}>
        <p>No search results for '{props.searchText}'</p>
      </div>

      <section className="items-grid">
        {selectedItems.map(item => (
          <CharacterItem
            key={item.id}
            item={item}
            favorite={props.isFavorites}
          ></CharacterItem>
        ))}
      </section>
    </>
  );
};

export default ItemsGrid;
