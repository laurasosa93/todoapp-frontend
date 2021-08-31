export const fetchFunction = (url, func) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject();
    })
    .then((data) => {
      func(data);
    })
    .catch();
};

export default fetchFunction;

