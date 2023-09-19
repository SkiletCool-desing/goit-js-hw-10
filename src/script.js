import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/api';
import { createMarkup, createMarkupCat } from './js/markup';
import refs from './js/refs';

refs.loaderEl.classList.add('visually-hidden');
refs.catInfoEl.classList.add('visually-hidden');

refs.selectEl.addEventListener('change', onValueId);

fetchBreeds()
  .then(arr => {
    load();
    refs.selectEl.innerHTML = '<option value= "" selected disabled>Choose your cat</option> ';
    return (refs.selectEl.innerHTML += createMarkup(arr.data));
  })
  .then(() => slim())
  .catch(fetchError);

function onValueId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then(obj => {
      load();

      return (refs.catInfoEl.innerHTML = createMarkupCat(obj.data));
    })
    .then(() => success())
    .catch(fetchError);
}
function fetchError() {
  Report.failure(refs.error.textContent, '');
}
function fetchError() {
  Report.failure(refs.error.textContent, '');refs.catInfoEl.classList.add('visually-hidden');
}
function success() {
  Notify.success('Search was successful!)', '');
}
function load() {
  refs.selectEl.hidden = false;
  refs.loaderEl.classList.remove('loader');
}

function slim() {
  new SlimSelect({
    select: refs.selectEl,
  });
}