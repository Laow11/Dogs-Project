const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_CLEAN":
      return {
        ...state,
        detail: action.payload,
      };

    case "SEARCH_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "POST_DOG":
      return {
        ...state,
      };

    case "ORDER_BY_NAME":
      let sortName =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortName,
      };

    case "ORDER_BY_WEIGHT":
      let sortWeight =
        action.payload === "weightasc"
          ? state.dogs.sort(function (a, b) {
              return b.weight_min - a.weight_min;
            })
          : state.dogs.sort(function (a, b) {
              return a.weight_min - b.weight_min;
            });
      return {
        ...state,
        dogs: sortWeight,
      };

    case "FILTER_CREATED":
      const allDogsCreated = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogsCreated.filter((f) => f.userCreated)
          : allDogsCreated.filter((f) => !f.userCreated);
      //console.log(allDogs)
      return {
        ...state,
        dogs: action.payload === "all" ? allDogsCreated : createdFilter,
      };

    case "FILTER_TEMPERAMENT":
      const allDogs = state.allDogs;
      const temperamentsFilter =
        action.payload === "all"
          ? allDogs
          : allDogs.filter((t) => {
              return t.temperament?.split(", ").includes(action.payload);
            });
      //console.log(temperamentsFilter)
      return {
        ...state,
        dogs: temperamentsFilter,
      };
    default:
      return { ...state };
  }
}
export default rootReducer;
