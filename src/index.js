import './sass/main.scss';
import NewsApiService from './js/news-service';
import cardTemplate from './templates/card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/load-more';
import anchors from './js/anchors';

const searchForm = document.querySelector('#search-form');
const cards = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();
let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsContainer();
  fetchHits();
}

function appendHitsMarkup(hits) {
  if (hits.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  const quantityTotal = newsApiService.quantity;
  Notiflix.Notify.info(`Hooray! We found ${quantityTotal} images.`);
  // console.log(hits.length);
  cards.insertAdjacentHTML('beforeend', cardTemplate(hits));
  lightbox.refresh();
  if (hits.length < 40) {
    loadMoreBtn.hide();
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function clearHitsContainer() {
  cards.innerHTML = '';
}

function fetchHits() {
  loadMoreBtn.disable();
  newsApiService.fetchCards().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}
