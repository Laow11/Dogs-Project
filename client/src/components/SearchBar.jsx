import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../actions";
import style from "../Styles/SearchBar.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    if (search === "") {
      return alert("Please, insert name");
    }

    dispatch(searchDogs(search));
    setSearch("");
  }

  function onInputChange(e) {
    setSearch(e.target.value);

    console.log(search);
  }

  return (
    <div className={style.nav}>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder="Search dog..."
          value={search}
          onChange={onInputChange}
        ></input>
        <input className={style.btn} type="submit" value="🐶"></input>
      </form>
    </div>
  );
}
