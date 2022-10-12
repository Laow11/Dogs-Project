import React from "react";
import style from "../Styles/Paginated.module.css";

export default function Paginated({
  dogsPerPage,
  currentPage,
  allDogs,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    // divido la cantidad de perros por pagina
    pageNumbers.push(i);
  }
  return (
    <nav className={style.nav}>
      <ul className={style.paginated}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={style.number} key={number}>
              <p
                // Para que destaque solo la pagina en la que estamos parados "current page"
                className={currentPage === number ? style.current : style.img}
                onClick={() => paginado(number)}
              >
                {number}
              </p>
            </li>
          ))}
      </ul>
    </nav>
  );
}
