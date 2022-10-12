import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Styles/Home.module.css";
import load from "../img/loading.gif";

import {
  getTemperaments,
  getDogs,
  orderByName,
  filterCreated,
  orderByWeight,
  filterTemperament,
} from "../actions";

import { Link } from "react-router-dom";
import Card from "./Card";
import NavBar from "./NavBar";
import Paginated from "./Paginated";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const allDogs = useSelector((state) => state.dogs); // Guardamos todos los perros en la variable
  const allTemperaments = useSelector((state) => state.temperaments); // Guardamos todos los estados
  //-PAGINADO----------------------------------------
  const [currentPage, setCurrentPage] = useState(1);

  const [dogsPerPage, setDogsPerPage] = useState(10); // Limito la cantidad de cards por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // 1 * 10
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={style.conteiner}>
      <NavBar />
      <div className={style.title}>
        <h1> The Dogs! </h1>
      </div>
      <div>
        <div className={style.row}>
          <select className={style.select} onChange={(e) => handleSort(e)}>
            <option hidden selected>
              Alphabetical Order
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select
            className={style.select}
            onChange={(e) => handleSortWeight(e)}
          >
            <option hidden selected>
              Order by weight
            </option>
            <option value="weight_max"> Heavier </option>
            <option value="weight_min"> Ligther </option>
          </select>
        </div>
        <select
          className={style.select}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option hidden selected>
            Filter Created
          </option>
          <option value="all"> All </option>
          <option value="created"> Created </option>
        </select>

        <select
          className={style.select}
          onChange={(e) => handleFilterByTemperament(e)}
        >
          <option hidden selected>
            Dogs by temperaments
          </option>
          <option value="all"> All </option>
          {allTemperaments.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <button className={style.button} onClick={(e) => handleReload(e)}>
        Reload
      </button>

      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        currentPage={currentPage}
        paginado={paginado}
      />
      {!currentDogs.length > 0 ? (
        <div className={style.loaDiv}>
          <img src={load} alt="not found" />
        </div>
      ) : (
        <div className={style.cards}>
          {currentDogs.map((d) => {
            return (
              <div key={d.id}>
                <Link className={style.cardLink} to={`/dog/${d.id}`}>
                  <Card
                    name={d.name}
                    img={
                      d.image
                        ? d.image
                        : "https://i.pinimg.com/originals/ca/55/7e/ca557ee5238148db7c5e3185b7d5e8d4.jpg"
                    }
                    temperament={d.temperament}
                    weight_max={d.weight_max}
                    weight_min={d.weight_min}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
