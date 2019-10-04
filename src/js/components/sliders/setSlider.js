import Slider from './Slider';
import classNames from './classNames';

class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
  }

  _getOptions() {
    this.getOptions = ({
      prevEl, nextEl, onInit,
    }) => ({
      gallery: {
        slidesPerView: 4,
        slidesPerColumn: 2,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
          nextEl,
          prevEl,
        },
        on: {
          init: onInit,
        },
        breakpoints: {
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
      works: {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl,
          prevEl,
        },
        on: {
          init: onInit,
        },
      },
      materials: {
        slidesPerView: 5,
        // spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl,
          prevEl,
        },
        on: {
          init: onInit,
        },
        breakpoints: {
          767: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
        },
      },
    });
  }

  _initSliders() {
    this.sliders = [];

    this.containers.forEach((container) => {
      if (container.classList.contains(classNames.plugin.initialized)) return;

      const slider = new Slider(container, this.getOptions);
      slider.init();
      this.sliders.push(slider);
    });
  }


  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers.length) return;

    this._getOptions();
    this._initSliders();
  }
}

const mySlider = new MySlider('.js-slider');

export default mySlider;
