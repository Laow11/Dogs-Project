export function validateDog(input) {
  let errors = []; // Almacen de errores

  if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
    errors.push({
      name: "name",
      description: "The first letter must be uppercase",
    });
  }

  if (input.height_max <= input.height_min) {
    errors.push({
      name: "height_min",
      description: "The height min value cannot be greater than max value",
    });
  }

  if (input.weight_max <= input.weight_min) {
    errors.push({
      name: "weight_min",
      description: "The weight min value cannot be greater than max value",
    });
  }

  if (input.life_time_max <= input.life_time_min) {
    errors.push({
      name: "life_time_min",
      description: "The life span min value cannot be greater than the max",
    });
  }

  if (
    input.img &&
    !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img)
  ) {
    errors.push({ name: "img", description: "Must be an URL or be empty" });
  }

  return errors;
}

export function isFilled(input) {
  return (
    input.name !== "" &&
    input.height_max !== "" &&
    input.height_min !== "" &&
    input.weight_max !== "" &&
    input.weight_min !== "" &&
    input.life_time_max !== "" &&
    input.life_time_min !== "" &&
    input.temperament.length !== 0
  );
}

//  Checkear si algun campo del input esta vacio
