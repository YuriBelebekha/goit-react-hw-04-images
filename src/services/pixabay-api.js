import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY  = '32534348-8cad927330b21d66d879b216b';

export const { image_type, orientation, safesearch, per_page } = {
  'image_type':  'photo',
  'orientation': 'horizontal',
  'safesearch': true,
  'per_page': '12',
};

async function fetchPixabayPhoto(q, page) {
  const response = await axios.get(`
  ${BASE_URL}?key=${API_KEY}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}
  `);  
  return await response.data;
};

const api = {
  fetchPixabayPhoto,
};

export default api;