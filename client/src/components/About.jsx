import React from "react";
import style from "../Styles/About.module.css";

export default function About() {
  return (
    <div className={style.conteiner}>
      <h1> In proccess! </h1>
      <h2> Hi! My name is Lautaro Gayoso </h2>
      <h5> Contact me </h5>
      <a href="https://www.linkedin.com/in/lautaro-gayoso-a39728208/">
        <img
          src="https://pnggrid.com/wp-content/uploads/2021/05/Linkedin-logo-Transparent-Image-1024x1024.png"
          alt="not found"
          width="50"
          height="50"
        />
      </a>

      <a href="https://github.com/Laow11">
        <img
          src="https://pngimg.com/uploads/github/github_PNG58.png"
          alt="not found"
          width="50"
          height="50"
        />
      </a>
    </div>
  );
}
