import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { validateDog, isFilled } from "../utils/validateDog";
import style from "../Styles/PostDog.module.css";
// ----> Control del los inputs en la creacion de la Raza!

export default function PostDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState([]);

  const [input, setInput] = useState({
    name: "",
    height_max: "",
    height_min: "",
    weight_max: "",
    weight_min: "",
    life_time_max: "",
    life_time_min: "",
    temperament: [],
    img: "",
  });

  // console.log(temperaments)
  //al estado input ademas de lo que tiene le agrega el e.target.value de lo que este modificando
  //va llenando el estado que planteamos arriba

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleSelect(e) {
    if (input.temperament.length === 3) {
      alert("The dog can't have more than three temperaments!");
    } else {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }

  function handleDelete(d) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== d),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(validateDog(input));

    // Function que controla los inputs
    if (isFilled(input)) {
      setErrors(validateDog(input)); // validateDog, funcion que controla el formulario. Seteo los errores en Seterrors

      if (validateDog(input).length === 0) {
        dispatch(postDog(input));
        alert("Done");
        setInput({
          name: "",
          height_max: "",
          height_min: "",
          weight_max: "",
          weight_min: "",
          life_time_max: "",
          life_time_min: "",
          temperament: [],
          img: "",
        });
        history.push("/home"); // El history es para volver al home una vez creada la raza
      }
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.conteiner}>
      <Link to="/home">
        <button className={style.button}> Back to home </button>
      </Link>
      <h1 className={style.title}> Create your breed! </h1>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.row}>
          <label className={style.labell}>
            <input
              className={style.inputl}
              type="text"
              value={input.name}
              name="name"
              id="name"
              required
              placeholder="Enter the breed..."
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <br />
        <div className={style.row}>
          <label className={style.label}> Size: </label>
          <br />
          <div>
            <input
              className={style.input}
              type="number"
              value={input.height_min}
              min="1"
              max="100"
              name="height_min"
              id="height_min"
              required
              placeholder="min"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              className={style.input}
              type="number"
              value={input.height_max}
              min="1"
              max="100"
              name="height_max"
              id="height_max"
              required
              placeholder="max"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <br />

        <div className={style.row}>
          <label className={style.label}> Weight: </label>
          <br />
          <input
            className={style.input}
            type="number"
            value={input.weight_min}
            min="1"
            max="100"
            name="weight_min"
            id="weight_min"
            required
            placeholder="min"
            onChange={(e) => handleChange(e)}
          />
          <div>
            <input
              className={style.input}
              type="number"
              value={input.weight_max}
              min="1"
              max="100"
              name="weight_max"
              id="weight_max"
              required
              placeholder="max"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <br />

        <div className={style.row}>
          <label className={style.label}> Life span:</label>
          <br />
          <div className={style.coso}>
            <input
              className={style.input}
              type="number"
              value={input.life_time_min}
              min="1"
              max="100"
              name="life_time_min"
              id="life_time_min"
              required
              placeholder="min"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              className={style.input}
              type="number"
              value={input.life_time_max}
              min="1"
              max="100"
              name="life_time_max"
              id="life_time_max"
              required
              placeholder="max"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <br />

        <label className={style.labell}> Image: </label>
        <input
          className={style.inputl}
          type="imagen"
          value={input.img}
          name="img"
          placeholder="URL"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <label className={style.label}> Temperaments: </label>
        <select className={style.select} onChange={(e) => handleSelect(e)}>
          {temperaments.map((t) => (
            <option value={t.id} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <ul className={style.ul}>
          <li>
            {/* Mapeo el array a medida que se llena el input para renderizarlo en forma de boton */}
            {input.temperament.map((t) => (
              <button type="button" key={t} onClick={() => handleDelete(t)}>
                {/* Buscar por id y renderizar el nombre, eso es para evitar posibles errores en consola del navegador por 'key' repetidos */}
                {temperaments.find((temp) => t === temp.id)?.name}
              </button>
            ))}
          </li>
        </ul>

        <button className={style.button2} type="submit">
          Create Breed
        </button>
      </form>

      {/* Muestra de validaciones en el componente */}

      <div className={style.danger}>
        {errors &&
          errors.map((e, i) => (
            <p className={style.error} key={`error_${i}`}>
              {e.description}
            </p>
          ))}
      </div>
    </div>
  );
}
