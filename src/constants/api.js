export const fetchTest = () => {
  fetch("http://localhost:8014/test").then((res) => res.json());
};
