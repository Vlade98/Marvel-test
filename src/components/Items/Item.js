import React, { useState } from "react";

import classes from "./Item.module.css";
import altImg from "../../images/alternative-img.jpg";

const CharacterItem = props => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favorite = item => {
    let previousData = JSON.parse(localStorage.getItem("favorites"));

    const hasSameItems = previousData.some(itm => {
      return itm.id === item.id;
    });

    if (!hasSameItems) {
      previousData.push(item);
      localStorage.setItem("favorites", JSON.stringify(previousData));
      setIsFavorite(true);
    } else {
      const newList = previousData.filter(
        favourite => favourite.id !== item.id
      );

      localStorage.setItem("favorites", JSON.stringify(newList));
      setIsFavorite(false);
      props.setIsFavorites(false);
    }
  };

  let previousData = JSON.parse(localStorage.getItem("favorites"));
  const hasSameItems = previousData.some(itm => {
    return itm.id === props.item.id;
  });

  return (
    <div className={classes.item}>
      <object
        className="item-img"
        data={
          props.item.thumbnail.path +
          "/standard_xlarge." +
          props.item.thumbnail.extension
        }
        type="image/jpg"
      >
        <img className={classes["item-img"]} src={altImg} alt="" />
      </object>

      <div className={classes["item-text"]}>
        <h1>{props.item.name}</h1>
        <button type="button" onClick={() => favorite(props.item)}>
          {isFavorite || hasSameItems ? "Remove" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default CharacterItem;
