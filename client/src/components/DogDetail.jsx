import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClean, getDetail } from "../actions";
import style from "../Styles/DogDetail.module.css";
import load from "../img/dogDetail.gif";

export default function DogDetail() {
  const myDog = useSelector((state) => state.detail); // conectamos nuestros componentes mediante useSelector
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getClean());
  }, [dispatch, id]); // Se ejecutara en caso de haber cambios

  return (
    <div className={style.conteiner}>
      <Link to="/home">
        <button className={style.button}>Back to Home</button>
      </Link>

      {myDog.length > 0 ? (
        <div className={style.card}>
          <div className={style.edit}></div>
          <h1 className={style.title}>{myDog[0].name}</h1>
          <img
            className={style.img}
            alt="img not found"
            src={
              myDog[0].image // Traer imagen de la api
                ? myDog[0].image
                : "https://i.pinimg.com/originals/ca/55/7e/ca557ee5238148db7c5e3185b7d5e8d4.jpg" // en caso de no existir, sera mi default value
            }
          />
          <p className={style.text}>
            {
              !myDog[0].life_time_max // Si no tiene tiempo de vida maximo
                ? `Their life span is approximately ${myDog[0].life_time_min}.` // Pasamos un aproximado
                : `Their life span is between ${myDog[0].life_time_min} and ${myDog[0].life_time_max} years.`
              // en caso de tener ambos
            }
            <br />
            Their temperaments are {""} {/* Un espacio*/}
            {!myDog[0].userCreated
              ? myDog[0].temperament + " "
              : myDog[0].temperaments.map((t) => t.name + ", ")}
            . <br />
            {!myDog[0].height_max
              ? `These dogs can measure up to ${myDog[0].height_min} cm approximately.`
              : `These dogs can measure between ${myDog[0].height_min} and ${myDog[0].height_max} cm.`}
            <br />
            and weight between {myDog[0].weight_min} and {myDog[0].weight_max}
            kg.
          </p>
        </div>
      ) : (
        <div>
          <img className={style.load} src={load} alt="img not found" />
        </div>
      )}
    </div>
  );
}
