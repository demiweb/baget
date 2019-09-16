import 'smooth-scrolling/smooth-scrolling';
import { debounce } from 'throttle-debounce';
import { isTouch } from '../helpers';
import { IS_ABOVE } from '../constants';
import animateBgText from './animateBgText';
import fixedFooter from './setFooter';

class Scroll {
  constructor(wrap, getOptions) {
    this.wrap = wrap;
    this.footer = document.querySelector('.footer');
    this.scrolledEls = [...document.querySelectorAll('.js-scrolled-el')];
    this.customWheelBlocks = [...document.querySelectorAll('.js-wheel-custom-block')];
    this.height = wrap.offsetHeight;
    this.name = wrap.dataset.name || 'default';
    this.options = getOptions({
      section: this.wrap,
      callback: this.onScroll.bind(this),
    })[this.name];

    this.inited = false;
    this.pause = false;
    this.allowRefresh = true;
  }

  onScroll() {
    this.position = Math.floor(this.smooth.vars.current);
    this.bottom = Math.floor(this.smooth.vars.bounding);
    const roundIndex = 5;
    this.isBottom = this.position >= this.bottom - roundIndex;
    this.isTop = this.position === 0;

    // all onScroll events go here
    fixedFooter.toggleAbove(this.isBottom);
    animateBgText(this.position);
    if (this.position > 100) fixedFooter.show();
  }

  allowClickOnCustomWheelBlocks() {
    if (!this.customWheelBlocks.length) return;

    this.customWheelBlocks.forEach((block) => {
      const parent = block.parentNode;
      const overlay = document.createElement('div');
      if (window.getComputedStyle(parent).position !== 'absolute') {
        parent.style.position = 'relative';
      }

      overlay.style.position = 'absolute';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.top = '0';
      overlay.style.bottom = '0';
      overlay.style.zIndex = '1';
      parent.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        overlay.style.pointerEvents = 'none';
      });
      block.addEventListener('mouseleave', (e) => {
        overlay.style.pointerEvents = '';
      });
    });
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
    this.smooth = new Smooth(this.options);

    console.log(this.options);
  }

  initPlugin() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (document.body.classList.contains('is-virtual-scroll')) return;

      if (!this.inited) {
        document.body.style.overflow = 'hidden';
        this.smooth.init();
        this.inited = true;
      } else {
        this.reinitPlugin();
      }
    } else if (document.body.classList.contains('is-virtual-scroll')) {
      this.destroyPlugin();
    }
  }

  reinitPlugin() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    this.setPlugin();
    this.smooth.init();
  }

  refreshPlugin() {
    const top = this.smooth.vars.current;

    this.smooth.destroy();
    this.setPlugin();
    this.smooth.init();
    this.smooth.scrollTo(top);

    this.allowRefresh = false;

    setTimeout(() => {
      this.allowRefresh = true;
    }, 500);
  }

  destroyPlugin() {
    this.smooth.destroy();
    this.wrap.style.transform = '';
    document.body.style.overflow = '';
  }

  observeChildren() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log({ mutation, scroll: this });

        const newHeight = this.wrap.offsetHeight;

        if (this.height !== newHeight) {
          if (this.allowRefresh) {
            this.height = newHeight;
            this.refreshPlugin();
          }
        }
      });
    });
    this.observer.observe(this.wrap, { childList: true, subtree: true });
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (this.inited) {
        this.smooth.vars.bounding = this.wrap.getBoundingClientRect().height
          - this.smooth.vars.height;
        // this.smooth.resize();
      }
    }

    this.initPlugin();
  }

  init() {
    this.setPlugin();
    this.initPlugin();
    this.preventScroll();
    this.allowClickOnCustomWheelBlocks();

    window.onload = () => {
      setTimeout(() => {
        this.observeChildren();
      }, 1000);
    };

    this.onResize = debounce(300, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);

    console.log(this);
  }
}

export default function setSmoothScrolling() {
  if (isTouch) return;

  const wrap = document.querySelector('.js-scroll');
  if (!wrap) return;

  function getOptions({ section, callback }) {
    return {
      default: {
        section,
        callback,
        ease: 0.05,
      },
    };
  }

  const scroll = new Scroll(wrap, getOptions);
  scroll.init();
}
