import Notiflix from 'notiflix';
const axios = require('axios').default;

export default class NewsApiService {
  constructor() {
    this.search = '';
    this.page = 1;
    this.total = '';
  }
  async fetchCards() {
    try {
      const URL = 'https://pixabay.com/api/';
      const quantity = '40';
      const KEY = '25851968-4919ec9d4a264dc8dd1f164b6';
      const response = await axios.get(
        `${URL}?key=${KEY}&q=${this.search}&per_page=${quantity}&orientation=horizontal&page=${this.page}&image_type=photo&safesearch=true`,
      );
      const { hits, total } = await response.data;
      this.page += 1;
      this.total = total;

      return hits;
    } catch (error) {
      console.log(error);
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        'Notiflix Failure',
        '"Failure is simply the opportunity to begin again, this time more intelligently." <br/><br/>- Henry Ford',
        'Okay',
      );
    }
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
