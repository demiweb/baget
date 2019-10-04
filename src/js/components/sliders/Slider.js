import Swiper from 'swiper/dist/js/swiper';
import setLazy from '../setLazy';
import classNames from './classNames';

export default class Slider {
  constructor(container, getOptions) {
    this.container = container;
    this.name = container.dataset.slider;
    this.wrap = container.closest(`.${classNames.slider.wrap}`);
    this.controls = {
      prev: this.wrap.querySelector(`.${classNames.slider.prev}`),
      next: this.wrap.querySelector(`.${classNames.slider.next}`),
    };
    this.slides = [...container.querySelectorAll(`.${classNames.slider.slide}`)];

    this.nameMod = undefined; // if need to reinit slider with different options

    this.options = getOptions({
      prevEl: this.controls.prev,
      nextEl: this.controls.next,
      onInit: setLazy,
    })[this.nameMod || this.name];
  }

  _initPlugin() {
    this.mySwiper = new Swiper(this.container, this.options);
  }

  // destroy() {
  //   if (!this.tns.destroy) return;
  //   this.tns.destroy();
  // }

  init() {
    this._initPlugin();
  }
}
