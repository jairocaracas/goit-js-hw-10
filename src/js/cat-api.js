import axios from 'axios';
import Notiflix from 'notiflix';

let loader = document.querySelector('.loader');
let loaderText = document.querySelector('.loader-text');

let errorText = document.querySelector('.error');

axios.defaults.headers.common['x-api-key'] =
  'live_XwTST7Kc5crPbc4iT5i5jA5gESz1ziFUnqzev10SS5LebWCsYuhmKFersvSzWH1x';

async function getCats() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response;
  } catch (error) {
    loader.style.display = 'none';
    loaderText.style.display = 'none';
    Notiflix.Notify.warning('Error: ' + error);
    errorText.style.display = 'inline-block';
  }
}

async function getCatByBreed(id) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
    );
    loader.style.display = 'none';
    loaderText.style.display = 'none';

    return response;
  } catch (error) {
    Notiflix.Notify.warning('Error: ' + error);
    loader.style.display = 'none';
    loaderText.style.display = 'none';
    errorText.style.display = 'inline-block';
  }
}

export { getCats, getCatByBreed };
