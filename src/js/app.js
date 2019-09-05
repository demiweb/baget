// import $ from 'jquery';
// import '@babel/polyfill';
import 'intersection-observer';
import './lib/polyfill';
import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import setTextareaHeight from './components/setTextareaHeight';
import toggleMenu from './components/toggleMenu';
import animateOnScroll from './components/animateOnScroll';
import animateBgText from './components/animateBgText';
import setFooter from './components/setFooter';
import setScrollbar from './components/setScrollbar';
import setSliders from './components/setSliders';
// import setHeroTitle from './components/setHeroTitle';
import setGallery from './components/setGallery';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setTextareaHeight();
  toggleMenu();
  animateOnScroll();
  animateBgText();
  setFooter();
  setScrollbar();
  setSliders();
  // setHeroTitle();
  setGallery();
});

// $(() => {
//   sayHello();
//   setHTMLClassNames();
//   setLazy();
// });
