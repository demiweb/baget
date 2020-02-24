import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'core-js/features/object/assign';
import 'core-js/features/object/values';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import { setVhProperty } from './helpers';
import setTextareaHeight from './components/setTextareaHeight';
import toggleMenu from './components/toggleMenu';
import animateOnScroll from './components/animateOnScroll';
import fixedFooter from './components/setFooter';
import setScrollbar from './components/setScrollbar';
import mySlider from './components/sliders/setSlider';
import setGallery from './components/setSelects';
import setSelects from './components/setGallery';

import setAnimations from './components/animations/setAnimations';
import toggleInputFocus from './components/toggleInputFocus';
import setInputMask from './components/setInputMask';
import setTabs from './components/setTabs';
// import setPanorama from './components/setPanorama';

import Scroll from './components/setSmoothScrolling';
import scrollTo from './components/scrollTo';
import setPopups from './components/setPopups';
import setHomePagePosition from './components/setHomePagePosition';

import animateStagger from './components/animations/animateStagger';
import zoomImage from './components/zoomImage';

function getScrollOptions({ section, callback }) {
  return {
    default: {
      section,
      callback,
      ease: 0.05,
    },
    horizontal: {
      section,
      callback,
      ease: 0.05,
      direction: 'horizontal',
      vs: { passive: false },
    },
  };
}

class App {
  constructor() {
    this.scroll = null;
  }

  init() {
    sayHello();
    setHTMLClassNames();
    setLazy();
    setVhProperty();
    setSelects();

    const wrap = document.querySelector('.js-scroll');
    this.scroll = new Scroll(wrap, getScrollOptions);

    setTextareaHeight();
    toggleMenu();
    animateOnScroll();

    fixedFooter.init();
    mySlider.init();

    setGallery();
    setScrollbar();
    setAnimations();
    toggleInputFocus();
    setInputMask();
    setTabs();
    scrollTo(this);
    setPopups(this);
    setHomePagePosition(this);
    zoomImage();
  }
}

let app = null;
document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.init();
});

window.setLazy = setLazy;
window.animateStagger = animateStagger;

window.onload = () => {
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    app.scroll.init();
  });
};
