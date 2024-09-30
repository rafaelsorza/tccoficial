import axios from 'axios';


const api = axios.create({
  baseURL: 'https://world.openfoodfacts.org', // ou a base URL da TACO API
});

export default api;