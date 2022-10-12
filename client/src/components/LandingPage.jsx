import React from "react";
import { Link } from "react-router-dom";
import style from "../Styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.conteiner}>
      <h1 className={style.title}> DogBlog </h1>
      <Link to="/home">
        <button className={style.btn}> → Home ← </button>
      </Link>
    </div>
  );
}
