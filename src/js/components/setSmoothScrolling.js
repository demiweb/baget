import 'smooth-scrolling/smooth-scrolling';
import { isTouch, isIE } from '../helpers';
import { IS_TOP } from '../constants';
import animateBgText from './animateBgText';

class Scroll {
  constructor(wrap) {
    this.wrap = wrap;
    this.footer = document.querySelector('.footer');
    this.scrolledEls = [...document.querySelectorAll('.js-scrolled-el')];
  }

  toggleWrapEnabling() {
    this.position = Math.round(this.smooth.vars.current);
    this.bottom = Math.round(this.smooth.vars.bounding);

    animateBgText(this.position);

    if (this.position >= this.bottom - 5) {
      this.footer.classList.add(IS_TOP);
    } else {
      this.footer.classList.remove(IS_TOP);
    }
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
      section: this.wrap,
      callback: this.toggleWrapEnabling.bind(this),
    });
  }

  initPlugin() {
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
