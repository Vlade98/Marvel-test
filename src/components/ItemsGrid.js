import React from "react";
import CharacterItem from "./Item";
import "./ItemsGrid.css";

const ItemsGrid = props => {
  const Clear = () => {
    localStorage.clear();
    props.setIsFavorites(false);
  };

  return (
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
      <section className="items-grid">
        {props.items.map(item => (
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
