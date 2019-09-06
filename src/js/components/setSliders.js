import Swiper from 'swiper/dist/js/swiper';
import setLazy from './setLazy';

class MySlider {
  constructor(slider, getOptions) {
    this.slider = slider;
    this.name = slider.dataset.slider;
    this.wrap = slider.closest('.slider__wrap');
    this.prev = this.wrap.querySelector('.js-slider-prev');
    this.next = this.wrap.querySelector('.js-slider-next');
    this.pagination = this.wrap.querySelector('.js-pagination');
    this.slides = [...slider.querySelectorAll('.swiper-slide')];

    this.options = getOptions({
      next: this.next,
      prev: this.prev,
      pagination: this.pagination,
    })[this.name];
  }

  init() {
    this._initSlider();
  }

  _initSlider() {
    this.mySwiper = new Swiper(this.slider, this.options);
  }
}

export default function setSliders() {
  const sliders = [...document.querySelectorAll('.js-slider')];
  if (!sliders.length) return;

  function getOptions({ next, prev, pagination }) {
    return {
      gallery: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        on: {
          init: setLazy,
        },
        breakpoints: {
          991: {
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
          nextEl: next,
          prevEl: prev,
        },
        on: {
          init: setLazy,
        },
      },
      materials: {
        slidesPerView: 5,
        // spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        on: {
          init: setLazy,
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
    };
  }

  sliders.forEach((slider) => {
    const mySlider = new MySlider(slider, getOptions);
    mySlider.init();
  });
}
