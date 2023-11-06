import Notiflix from 'notiflix';

function notifyNoImg() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      width: 'auto',
      fontSize: '22px',
      position: 'top-right',
    }
  );
}
function notifyEndOfGallery() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results.",
    {
      width: 'auto',
      fontSize: '22px',
      position: 'top-right',
    }
  );
}
function notifyEnterQuery (){
  Notiflix.Notify.failure('Please enter a query in the search field.')

}
export { notifyNoImg, notifyEndOfGallery, notifyEnterQuery };