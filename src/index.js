import { getCats, getCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

let list = document.querySelector('.breed-select');
let loader = document.querySelector('.loader');
let loaderText = document.querySelector('.loader-text');

let error = document.querySelector('.error');

let catInfo = document.querySelector('.cat-info');

async function fetchCats() {
  const cats = await getCats();

  let renderData = cats.data.map(value => {
    return { text: value.name, value: value.id };
  });

  new SlimSelect({
    select: list,
    data: renderData,
  });
}

fetchCats();

async function fetchCatByBreed(e) {
  error.style.display = 'none';

  loader.style.display = 'inline-block';
  loaderText.style.display = 'inline-block';

  catInfo.innerHTML = ' ';
  const breed = await getCatByBreed(e.target.value);
  let breedInfo = breed.data[0];
  let renderImg = `
  <img src="${breedInfo.url}" style="margin: 0 auto;">
  <h2>${breedInfo.breeds[0].name}</h2>
  <p>${breedInfo.breeds[0].description}</p>
  <h3>Temperament:</h3>
  <p>${breedInfo.breeds[0].temperament}</p>
  `;
  catInfo.innerHTML += renderImg;

  console.log(breedInfo.breeds[0].name);
}

list.addEventListener('change', fetchCatByBreed);
