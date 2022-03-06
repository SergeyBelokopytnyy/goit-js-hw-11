export default class NewsApiService {
  constructor() {
    this.search = '';
    this.page = 1;
    this.total = '';
  }
  async fetchCards() {
    const URL = 'https://pixabay.com/api/';
    const quantity = '40';
    const KEY = '25851968-4919ec9d4a264dc8dd1f164b6';
    const response = await fetch(
      `${URL}?key=${KEY}&q=${this.search}&per_page=${quantity}&orientation=horizontal&page=${this.page}&image_type=photo&safesearch=true`,
    );
    const { hits, total } = await response.json();
    this.page += 1;
    this.total = total;
    return hits;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.search;
  }
  set query(newQuery) {
    this.search = newQuery;
  }
  get quantity() {
    return this.total;
  }
}
