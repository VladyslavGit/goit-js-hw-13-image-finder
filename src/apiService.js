const APIKEY = '15377508-ff38c9d06f0ff909fbfde181e';
const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
export default function fetchImages(query, page) {
  return fetch(`${baseUrl}${query}&page=${page}&per_page=12&key=${APIKEY}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}
