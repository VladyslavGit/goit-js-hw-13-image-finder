import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import fetchImages from './apiService';
import imageTemplate from './templates/imageTemplate.hbs';
const galleryList = document.querySelector('#js-gallery');
const form = document.querySelector('#search-form');
const moreButton = document.querySelector('[data-action="load"]');

form.addEventListener('submit', handleSearch);
function handleSearch(e) {
  if (!form.elements[0].value) {
    return;
  }
  e.preventDefault();
  const query = form.elements[0].value;
  fetchImages(query)
    .then(data => data.hits)
    .then(arr => {
      if (arr.length === 0) {
        PNotify.error({
          text: 'Images not found. Please try again',
        });
      } else {
        PNotify.closeAll();
        OurFirstMarkup(arr);
      }
    });
}

function OurFirstMarkup(arr) {
  const markUp = arr.map(images => imageTemplate(images)).join('');
  galleryList.innerHTML = markUp;
  moreButton.classList.remove('display-none');
}

moreButton.addEventListener('click', handleMorePage);
let page = 1;
function handleMorePage(e) {
  const query = form.elements[0].value;
  page += 1;
  fetchImages(query, page)
    .then(data => data.hits)
    .then(arr => addMoreMarkup(arr))
    .then(markup => scroll());
}

function addMoreMarkup(arr) {
  const additionalMarkup = arr.map(images => imageTemplate(images)).join('');
  galleryList.insertAdjacentHTML('beforeend', additionalMarkup);
}

function scroll() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}