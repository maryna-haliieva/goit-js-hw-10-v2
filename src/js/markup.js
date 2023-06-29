export const createOptionsMarkup = breeds => {
  return breeds
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
};

export const createInfoMarkup = ({ name, description, temperament, url }) => {
  return `<img src=${url} alt=${name} width="400">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>Temperament: ${temperament}</p>`;
};
