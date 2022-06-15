import React from "react";
import CharacterItem from "./Item";
import "./ItemsGrid.css";

const ItemsGrid = props => {
  return (
    <section className="items-grid">
      {props.items.map(item => (
        <CharacterItem key={item.id} item={item}></CharacterItem>
      ))}
    </section>
  );
};

export default ItemsGrid;
