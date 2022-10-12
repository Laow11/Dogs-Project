import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "../Styles/NavBar.module.css";
import home from "../img/home.png";

export default function NavBar() {
  return (
    <header>
      <div className={style.navbar}>
        <NavLink to="/">
          <img
            className={style.img}
            src={home}
            id="landingPage"
            width="50"
            height="50"
            alt="img not found"
          />
        </NavLink>
        <NavLink to="/home">
          <p className={style.text}>Home</p>
        </NavLink>
        <NavLink to="/create">
          <p className={style.text}>Create your Breed</p>
        </NavLink>
        <NavLink to="/about">
          <p className={style.text}>Contact</p>
        </NavLink>

        <SearchBar />
      </div>
    </header>
  );
}
