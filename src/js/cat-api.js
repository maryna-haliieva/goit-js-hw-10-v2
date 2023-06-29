import axios from 'axios';
const API_KEY =
  'live_AvvsgHyovvy2AdMVES5ZRiKIzKwKU5D5wIGkqvveqbhS9f5YNTdNPlu1Z1T83UNG';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = BASE_URL;

export const fetchBreeds = () => {
  return axios.get('/breeds');
};

export const fetchCatByBreed = breedId => {
  return axios.get(`/images/search?breed_ids=${breedId}`);
};
