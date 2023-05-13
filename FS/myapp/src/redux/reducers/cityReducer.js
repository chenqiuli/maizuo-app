const CityReducer = (prevState = {
  cityName: '广州',
  cityId: "440100"
}, action) => {
  const newState = { ...prevState };
  switch (action.type) {
    case "change_city":
      newState.cityName = action.payload.cityName;
      newState.cityId = action.payload.cityId;
      return newState;

    default:
      return prevState;
  }
};

export default CityReducer;