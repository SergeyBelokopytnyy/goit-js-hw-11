import Notiflix from 'notiflix';

export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    Notiflix.Loading.remove();
  }

  disable() {
    this.refs.button.disabled = true;
    Notiflix.Loading.standard();
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
