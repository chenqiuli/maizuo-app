const TabbarReducer = (prevState = {
  show: true
}, action) => {
  const newState = { ...prevState };
  switch (action.type) {
    case "tabbar_hide":
      newState.show = false;
      return newState;

    case "tabbar_show":
      newState.show = true;
      return newState;

    default:
      return prevState;
  }
};

export default TabbarReducer;