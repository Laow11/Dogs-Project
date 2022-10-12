import React from "react";
import style from "../Styles/Card.module.css";

export default function Card({
  name,
  img,
  temperament,
  weight_min,
  weight_max,
}) {
  return (
    <div className={style.conteiner}>
      <h2 className={style.name}>{name}</h2>
      <img
        className={style.img}
        src={img}
        alt="img not found"
        width="350px"
        height="300px"
      />
      <h4 className={style.temperament}>Temperaments: {temperament}</h4>
      <h5 className={style.weight}>
        {weight_min} - {weight_max}kg.
      </h5>
    </div>
  );
}
