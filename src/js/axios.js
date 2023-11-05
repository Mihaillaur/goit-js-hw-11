import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
async function getImages(request, page) {
  const params = new URLSearchParams({
    key: '39328384-9d7b89bbcb065919272762284',
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });
  return await axios(`?${params}`);
}
export { getImages };