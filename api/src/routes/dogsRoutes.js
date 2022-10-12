const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------GET---------------------------

//traer la informacion desde la api
const getApiInfo = async () => {
  try {
    // Pedido a la api
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=live_m3BAYjo94tnHQbUj7JxlGRhZY5Z32oYBwDnc7OeOF6AcKjLWTR6vesFpP7i9R8HX`
    );

    // Mapeamos la data que nos trajo
    const apiInfo = await apiUrl.data.map((e) => {
      // Retorna solo estos valores
      return {
        name: e.name,

        id: e.id,

        // El método split() divide un objeto de tipo String en un array

        height_min:
          e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],

        height_max:
          e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],

        weight_min:
          e.weight.metric.split(" - ")[0] !== "NaN" // Si el peso minimo es distinto de NaN, devolveme ese valor sino el defaultValue va a ser 6
            ? e.weight.metric.split(" - ")[0]
            : 6,

        weight_max:
          e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],

        life_time_min:
          e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],

        life_time_max:
          e.life_span.split(" - ")[1] &&
          e.life_span.split(" - ")[1].split(" ")[0],

        temperament: e.temperament ? e.temperament : "Unknown", // En caso de no existir temperamento

        image: e.image.url,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR IN getApiInfo", error);
  }
};

//traer la informacion desde la db
const getDBinfo = async () => {
  try {
    const perros = await Dog.findAll({
      include: Temperament, // Busca todos los perros incluido los temperamentos de la tabla
    });

    const info = perros.map((e) => {
      let temp = e.temperaments.map((e) => e.name);
      // esta variable es para que al mapear los nombres, pueda leer los creados por el usuario
      let aux = temp.join(", ");

      return {
        name: e.name,
        id: e.id,
        userCreated: e.userCreated,
        height_max: e.height_max,
        height_min: e.height_min,

        weight_max: e.weight_max,
        weight_min: e.weight_min,

        life_time_max: e.life_time_max,
        life_time_min: e.life_time_min,

        temperament: aux,
        image: e.image
          ? e.image
          : "https://i.pinimg.com/originals/ca/55/7e/ca557ee5238148db7c5e3185b7d5e8d4.jpg",
      };
    });
    //console.log(info)
    return info;
  } catch (error) {
    console.log("ERROR IN getDBInfo", error);
  }
};

// En una función GetallDogs, almaceno la informacion pedida desde la base de datos y la api
const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();

    // Utilizo .concat para establecer una relacion entre ambos tipos de datos, para que sea mas facil posteriormente despachar la action
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log("ERROR IN infoTotal", error);
  }
};

// -> Rutas

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(400).send("MISSING BREED");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/dogs/:id", async (req, res, next) => {
  try {
    // Guardo el dog creado en un array
    let dogBd = [];
    const { id } = req.params;
    if (typeof id === "string" && id.length > 6) {
      // Esto es porque nos crea un id unico de muchos caracteres
      dogBd = await Dog.findAll({ where: { id: id }, include: Temperament }); // Pedimos que nos traiga su ID y temperamentos de la tabla Temperament
    }
    if (dogBd.length) {
      res.send(dogBd); // En caso de existir creados, msotrarlos
    } else {
      const dogsTotal = await getAllDogs(); // Obtengo todos los perros
      let dogId = dogsTotal.filter((d) => d.id == id); // Filtro por id
      if (dogId) {
        res.send(dogId); // lo muestro en caso de existir
      } else {
        res.send("Doggie not found!");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/post", async (req, res, next) => {
  try {
    let {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image,
      temperament,
    } = req.body;

    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image,
    });
    newDog.addTemperament(temperament);
    res.status(201).json(newDog);
  } catch (error) {
    next(error);
  }
});

/* 

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Dog.destroy({
      where: { id: id },
    });
    return res.send("deleted!");
  } catch (error) {
    res.send("error");
  }
});  */

module.exports = router;
