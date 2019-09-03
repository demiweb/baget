// import $ from 'jquery';
// import '@babel/polyfill';
import './lib/polyfill';
import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import setTextareaHeight from './components/setTextareaHeight';
import toggleMenu from './components/toggleMenu';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setTextareaHeight();
  toggleMenu();
});

// $(() => {
//   sayHello();
//   setHTMLClassNames();
//   setLazy();
// });
