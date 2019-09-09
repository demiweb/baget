import 'smooth-scrolling/smooth-scrolling';
import { isTouch, isIE } from '../helpers';
import { IS_ABOVE } from '../constants';
import animateBgText from './animateBgText';
import fixedFooter from './setFooter';

class Scroll {
  constructor(wrap) {
    this.wrap = wrap;
    this.footer = document.querySelector('.footer');
    this.scrolledEls = [...document.querySelectorAll('.js-scrolled-el')];
  }

  onScroll() {
    this.position = Math.round(this.smooth.vars.current);
    this.bottom = Math.round(this.smooth.vars.bounding);
    const roundIndex = 5;
    this.isBottom = this.position >= this.bottom - roundIndex;
    this.isTop = this.position === 0;

    // all onScroll events go here
    fixedFooter.toggleAbove(this.isBottom);
    animateBgText(this.position);
  }

  preventScroll() {
    if (!this.scrolledEls.length) return;

    this.scrolledEls.forEach((el) => {
      el.addEventListener('wheel', (e) => {
        if (document.body.classList.contains('is-virtual-scroll') && !this.pause) {
          this.smooth.off();
          this.pause = true;
        }
      });
    });

    window.addEventListener('wheel', (e) => {
      if (document.body.classList.contains('is-virtual-scroll') && this.pause) {
        this.smooth.on();
        this.pause = false;
      }
    });
  }

  setPlugin() {
    // eslint-disable-next-line
    this.smooth = new Smooth({
      ease: 0.05,
      section: this.wrap,
      callback: this.onScroll.bind(this),
    });
  }

  reinitPlugin() {
    const top = this.smooth.vars.current;

    function destroy() {
      return new Promise((resolve) => {
        this.smooth.destroy();
        resolve();
      });
    }

    function set() {
      return new Promise((resolve) => {
        this.setPlugin();
        resolve();
      });
    }

    function init() {
      this.smooth.init();
      this.smooth.scrollTo(top);
    }

    destroy.call(this)
      .then(set.bind(this))
      .then(init.bind(this));
  }

  observeChildren() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log({ mutation, scroll: this });

        this.reinitPlugin();
      });
    });
    this.observer.observe(this.wrap, { childList: true, subtree: true });
  }

  initPlugin() {
    this.observeChildren();
    if (window.matchMedia('(min-width: 768px)').matches
      && !document.body.classList.contains('is-virtual-scroll')) {
      this.smooth.init();
    } else if (document.body.classList.contains('is-virtual-scroll')) {
      this.smooth.destroy();
    }
  }


  init() {
    this.setPlugin();
    this.initPlugin();
    this.preventScroll();
    // window.addEventListener('resize', this.initPlugin.bind(this));
  }
}

export default function setSmoothScrolling() {
  if (isTouch) return;

  const wrap = document.querySelector('.out');

  const scroll = new Scroll(wrap);
  scroll.init();
}
