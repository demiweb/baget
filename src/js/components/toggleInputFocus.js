import { HAS_FOCUS, HAS_TEXT } from '../constants';

class FormInput {
  constructor(input) {
    this.input = input;
    this.wrap = input.closest('.input')
      || input.closest('.textarea')
      || input.closest('.select')
      || input.parentNode;
  }

  addFocus(e) {
    this.wrap.classList.add(HAS_FOCUS);
  }

  removeFocus(e) {
    this.wrap.classList.remove(HAS_FOCUS);
  }

  handleText(e) {
    const valueMinNmb = this.input.value.indexOf('+38') > -1 ? 3 : 0;

    if (this.input.value.length > valueMinNmb) {
      this.wrap.classList.add(HAS_TEXT);
    } else {
      this.wrap.classList.remove(HAS_TEXT);
    }
  }

  _addListeners() {
    this.input.addEventListener('focus', this.addFocus.bind(this));
    this.input.addEventListener('blur', this.removeFocus.bind(this));
    this.input.addEventListener('input', this.handleText.bind(this));
  }

  init() {
    this._addListeners();
  }
}

export default function toggleInputFocus() {
  const inputs = [...document.querySelectorAll('.js-focused-input')];

  if (!inputs.length) return;

  inputs.forEach((input) => {
    const formInput = new FormInput(input);
    formInput.init();
  });
}
