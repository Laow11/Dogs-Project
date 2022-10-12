import React from "react";
import { Link } from "react-router-dom";
import style from "../Styles/ErrorNotFound.module.css";

export default function ErrorNotFound() {
  return (
    <div className={style.conteiner}>
      <Link to="/home">
        <img
          className={style.img}
          src="https://www.cinco8.com/wp-content/uploads/2020/08/404.png"
          alt="not Found"
        />
      </Link>
    </div>
  );
}
