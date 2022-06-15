import React, { useState } from "react";
import "./Item.css";
import altImg from "../images/alternative-img.jpg";

const CharacterItem = props => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favorite = item => {
    let previousData = JSON.parse(localStorage.getItem("favorites"));
    previousData.push(item);
    localStorage.setItem("favorites", JSON.stringify(previousData));
    setIsFavorite(true);
  };

  return (
    <div className="item">
      <object
        className="item-img"
        data={props.item.thumbnail.path + "/standard_xlarge.jpg"}
        type="image/jpg"
      >
        <img className="item-img" src={altImg} alt="" />
      </object>

      <div className="item-text">
        <h1>{props.item.name}</h1>
        <button
          className={isFavorite ? "favorite" : ""}
          type="button"
          onClick={() => favorite(props.item)}
        >
          Favorite
        </button>
      </div>
    </div>
  );
};

export default CharacterItem;
