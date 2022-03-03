import './sass/main.scss';
import NewsApiService from './js/news-service';
import cardTemplate from './templates/card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/load-more';

const searchForm = document.querySelector('#search-form');
const cards = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
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
  cards.insertAdjacentHTML('beforeend', cardTemplate(hits));
  lightbox.refresh();
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
