const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// - [X] __GET /temperament__:
// - Obtener todos los temperaments posibles
// - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/temperaments", async function (req, res) {
  try {
    const dataApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=live_m3BAYjo94tnHQbUj7JxlGRhZY5Z32oYBwDnc7OeOF6AcKjLWTR6vesFpP7i9R8HX`
    );
    //Mapeo los temperamentos y los guardo en temperaments

    let temperaments = dataApi.data.map((el) => el.temperament);

    //Junto el array en un string y lo vuelvo a dividir en un array

    temperaments = temperaments.join(", ").split(", ");

    //Filtro los vacios
    temperaments = temperaments.filter((v) => v);

    //Elimino potenciales duplicados
    temperaments = [...new Set(temperaments)].sort(); // .sort me devuelve de forma ordenada los elementos

    // Mediante un forEach, creo un nuevo temp en la tabla por cada elemento, esto para agregarlos a la tabla de Temperament en la DB
    temperaments.forEach((t) => {
      Temperament.findOrCreate({
        where: { name: t },
      });
    });

    //Ejecuto un findAll para traer todos los temperamentos y enviarlos mediante un res.send
    const allTemperament = await Temperament.findAll();
    res.send(allTemperament);
  } catch {
    res.send("Error");
  }
});

module.exports = router;
