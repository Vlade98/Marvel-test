import React from "react";
import CharacterItem from "./Item";
import classes from "./ItemsGrid.module.css";

const ItemsGrid = props => {
  return props.isLoading ? (
    <div className={classes["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <>
      <p className={classes.message}>
        {!props.results && `No search results for ${props.searchText}`}
      </p>

      <section className={classes["items-grid"]}>
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
