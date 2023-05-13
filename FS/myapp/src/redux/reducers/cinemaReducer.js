const CinemaReducer = (prevState = {
  cinemaList: [],
  cinemaDetail: {}
}, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case "fetch_cinemaList":
      newState.cinemaList = action.payload;
      return newState;

    case "fetch_cinemaDetailInfo":
      newState.cinemaDetail = action.payload;
      return newState;

    default:
      return prevState;
  }
};

export default CinemaReducer;