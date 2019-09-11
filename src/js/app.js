import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
// import { setVhProperty } from './helpers';
import setTextareaHeight from './components/setTextareaHeight';
import toggleMenu from './components/toggleMenu';
import animateOnScroll from './components/animateOnScroll';
// import animateBgText from './components/animateBgText';
import fixedFooter from './components/setFooter';
import setScrollbar from './components/setScrollbar';
import setSliders from './components/setSliders';
import setGallery from './components/setSelects';
import setSelects from './components/setGallery';
import setSmoothScrolling from './components/setSmoothScrolling';
import setAnimations from './components/animations/setAnimations';
import toggleInputFocus from './components/toggleInputFocus';
import setInputMask from './components/setInputMask';


document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  // setVhProperty();
  setTextareaHeight();
  toggleMenu();
  animateOnScroll();
  // animateBgText();
  // setFooter();
  fixedFooter.init();
  setScrollbar();
  setSliders();
  setGallery();
  setSelects();
  setSmoothScrolling();
  setAnimations();
  toggleInputFocus();
  setInputMask();
});
