import 'smooth-scrolling/smooth-scrolling';
import { debounce } from 'throttle-debounce';
import { TweenLite, Power1 } from 'gsap';
import ScrollToPlugin from 'gsap/umd/ScrollToPlugin';
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
    this.name = wrap.dataset.scroll || 'default';
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
            this.resetBounding();

            this.allowRefresh = false;
            setTimeout(() => {
              this.allowRefresh = true;
            }, 500);
          }
        }
      });
    });
    this.observer.observe(this.wrap, { childList: true, subtree: true });
  }

  resetBounding() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (this.inited) {
        this.smooth.vars.bounding = this.wrap.getBoundingClientRect().height
          - this.smooth.vars.height;
        // this.smooth.resize();
      }
    }
  }


  setHorizontalScroll() {
    if (!this.name === 'horizintal') return;


    const scrollTime = 1.2; // Scroll time
    const scrollDistance = 170;


    window.addEventListener('wheel', (e) => {
      const delta = e.wheelDelta / 120 || -e.detail / 3;
      // const scrollTop = window.scrollTop();
      const { scrollLeft } = document.documentElement;
      const finalScroll = scrollLeft - parseInt((delta * scrollDistance), 10);

      TweenLite.to(document.documentElement, scrollTime, {
        scrollTo: { x: finalScroll, autoKill: true },
        ease: Power1.easeOut,
        autoKill: true,
        overwrite: 5,
      });
    });
  }

  resize() {
    this.resetBounding();
    this.initPlugin();
  }

  init() {
    this.setPlugin();
    this.initPlugin();
    this.preventScroll();
    this.allowClickOnCustomWheelBlocks();
    this.observeChildren();

    this.setHorizontalScroll();

    this.onResize = debounce(300, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);
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
      horizontal: {
        section,
        // callback,
        ease: 0.05,
        direction: 'horizontal',
        native: true,
      },
    };
  }

  const scroll = new Scroll(wrap, getOptions);
  scroll.init();
}
