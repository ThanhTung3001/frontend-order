const InitCartAction = () => {
  const json = localStorage.getItem("cartInfo");
  if (json) {
    return JSON.parse(json);
  } else {
    return [];
  }
};
const storedCartAction = (data) => {
  localStorage.setItem("cartInfo", JSON.stringify(data));
};
const cleanCartAction = () => {
  localStorage.removeItem("cartInfo");
};
export { InitCartAction, storedCartAction, cleanCartAction };
