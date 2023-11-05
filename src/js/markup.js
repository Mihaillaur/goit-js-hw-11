function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
         <a class="gallery-link" href="${largeImageURL}" >
       <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
         <p class="info-item">
           <b>Likes</b><br/>${likes}
         </p>
         <p class="info-item">
           <b>Views</b><br/>${views}
         </p>
         <p class="info-item">
           <b>Comments</b><br/>${comments}
         </p>
         <p class="info-item">
           <b>Downloads</b><br/>${downloads}
         </p>
       </div>
       </a>
       </div>`
    )
    .join('');
}

export { createMarkup };
