import { notifyNoImg, notifyEndOfGallery } from './notiflix';
import { elements } from './elements';
import { getImages } from './axios';
import { createMarkup } from './markup';
let request = '';
let page = 1;
let totalImages = [];
let totalHits = 0;

elements.form.addEventListener('submit', handlerSubmit);
elements.btnLoadMore.addEventListener('click', handlerLoadMore);

async function handlerSubmit(evt) {
  evt.preventDefault();
  request = elements.input.value;
  try {
    const data = await getImages(request, page);
    console.log(data);
    const {
      data: { hits, totalHits: newTotalHits },
    } = data;

    totalHits = newTotalHits;
    if (hits.length === 0) {
      notifyNoImg();
      return;
    }
    elements.gallery.innerHTML = createMarkup(hits);
    hits.map(img => totalImages.push(img));
    console.log(totalImages.length);
    elements.btnLoadMore.classList.remove('visually-hidden');
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
    if (totalImages.length >= totalHits) {
      notifyEndOfGallery();
      elements.btnLoadMore.classList.add('visually-hidden');
    } else {
      elements.btnLoadMore.classList.remove('visually-hidden');
    }

    // page += 1;
  } catch (error) {
    console.log(error);
  }
}
