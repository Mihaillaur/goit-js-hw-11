import { notifyNoImg, notifyEndOfGallery, notifyEnterQuery } from './notiflix';
import { elements } from './elements';
import { getImages } from './axios';
import { createMarkup } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 0,
  close: true,
  history: true,
  animationSpeed: 250,
  fadeSpeed: 250,
  loop: true,
  docClose: true,
  swipe: true,
  disableScroll: true,
  centered: true,
});

let request = '';
let page = 1;
let totalImages = [];
let totalHits = 0;

elements.form.addEventListener('submit', handlerSubmit);
elements.btnLoadMore.addEventListener('click', handlerLoadMore);

async function handlerSubmit(evt) {
  evt.preventDefault();

  page = 1;
  totalImages = [];

  request = elements.input.value.trim();
  if (request === '') {
    notifyEnterQuery();

    return;
  }

  try {
    const data = await getImages(request, page);
    console.log(data);

    const {
      data: { hits, totalHits: newTotalHits },
    } = data;

    totalHits = newTotalHits;
    if (hits.length === 0) {
      notifyNoImg();
      elements.gallery.innerHTML = '';
      elements.btnLoadMore.classList.add('visually-hidden');
      return;
    }
    console.log(totalHits);
    console.log(hits.length);
    elements.gallery.innerHTML = createMarkup(hits);
    hits.map(img => totalImages.push(img));
    console.log(totalImages.length);
    elements.btnLoadMore.classList.remove('visually-hidden');
    if (totalImages.length >= totalHits) {
      notifyEndOfGallery();
      elements.btnLoadMore.classList.add('visually-hidden');
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}
async function handlerLoadMore() {
  try {
    const data = await getImages(request, (page += 1));
    const {
      data: { hits, totalHits: newTotalHits },
    } = data;

    totalHits = newTotalHits;

    if (hits.length === 0) {
      notifyNoImg();
      return;
    }

    hits.map(img => totalImages.push(img));
    console.log(totalImages.length);

    elements.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    lightbox.refresh();
    if (totalImages.length >= totalHits) {
      notifyEndOfGallery();
      elements.btnLoadMore.classList.add('visually-hidden');
    } else {
      elements.btnLoadMore.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}
