import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'core-js/features/object/assign';
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

import scroll from './components/setSmoothScrolling';
import scrollTo from './components/scrollTo';
import splitText from './components/splitText';
import setPopups from './components/setPopups';


document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setVhProperty();
  splitText();
  setTextareaHeight();
  toggleMenu();
  animateOnScroll();
  fixedFooter.init();
  setScrollbar();
  mySlider.init();
  setGallery();
  setSelects();

  setAnimations();
  toggleInputFocus();
  setInputMask();
  setTabs();

  scroll.init();
  // setPanorama();
  scrollTo();

  setPopups();
});
