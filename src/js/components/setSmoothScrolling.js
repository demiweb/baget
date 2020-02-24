import 'smooth-scrolling/smooth-scrolling';
import { debounce } from 'throttle-debounce';
import { isTouch } from '../helpers';
import animateBgText from './animateBgText';
import fixedFooter from './setFooter';
import scaleHorizontalContainer from './scaleHorizontalContainer';

export default class Scroll {
  constructor(wrap, options) {
    this.wrap = wrap;
    // this.scrolledEls = [...document.querySelectorAll('.js-scrolled-el')];
    this.customWheelBlocks = [...document.querySelectorAll('.js-wheel-custom-block')];
    this.height = wrap.scrollHeight;
    this.width = wrap.scrollWidth;
    this.name = wrap.dataset.scroll || 'default';
    this.options = options({
      section: this.wrap,
      callback: this.onScroll.bind(this),
    })[this.name];

    this.inited = false;
    this.pause = false;
    this.allowRefresh = true;
  }

  // eslint-disable-next-line
  get scrolledEls() {
    return [...document.querySelectorAll('.js-scrolled-el')];
  }

  get isHorizontal() {
    return this.options.direction === 'horizontal';
  }

  onScroll() {
    this.position = Math.floor(this.smooth.vars.current);
    this.bottom = Math.floor(this.smooth.vars.bounding);
    const roundIndex = 5;
    this.isBottom = this.position >= this.bottom - roundIndex;
    this.isTop = this.position === 0;

    // all onScroll events go here
    if (this.isHorizontal) {
      scaleHorizontalContainer.call(this);
    } else {
      fixedFooter.toggleAbove(this.isBottom);
      animateBgText(this.position);
      if (this.position > 100) fixedFooter.show();
    }
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
      el.addEventListener('wheel', () => {
        if (document.body.classList.contains('is-virtual-scroll') && !this.pause) {
          this.smooth.off();
          this.pause = true;
        }
      });
    });

    window.addEventListener('wheel', () => {
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

  destroyVsListeners() {
    if (this.isHorizontal) {
      this.smooth.vs.destroy();
    }
  }

  initPlugin() {
    if (!this.isHorizontal) {
      if (window.matchMedia('(min-width: 768px)').matches) {
        if (document.body.classList.contains('is-virtual-scroll')) return;

        if (!this.inited) {
          document.body.style.overflow = 'hidden';
          this.smooth.init();
          this.destroyVsListeners();
          this.inited = true;
        } else {
          this.reinitPlugin();
        }
      } else if (document.body.classList.contains('is-virtual-scroll')) {
        this.destroyPlugin();
      }
    } else if (!this.inited) {
      document.body.style.overflow = 'hidden';
      this.smooth.init();
      this.inited = true;
    }
  }

  reinitPlugin() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    this.setPlugin();
    this.destroyVsListeners();
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

        const newScrollSize = this.isHorizontal
          ? this.wrap.scrollWidth
          : this.wrap.scrollHeight;

        const setNewBounding = (scrollSize, newSize) => {
          if (scrollSize !== newSize) {
            if (this.allowRefresh) {
              if (this.isHorizontal) {
                this.width = newSize;
              } else {
                this.height = newSize;
              }

              this.resetBounding();

              this.allowRefresh = false;
              setTimeout(() => {
                this.allowRefresh = true;
              }, 500);
            }
          }
        };

        if (this.isHorizontal) {
          setNewBounding(this.width, newScrollSize);
        } else {
          setNewBounding(this.height, newScrollSize);
        }
      });
    });
    this.observer.observe(this.wrap, { childList: true, subtree: true });
  }

  resetBounding() {
    if (!this.isHorizontal) {
      if (window.matchMedia('(min-width: 768px)').matches) {
        if (this.inited) {
          this.smooth.vars.bounding = this.wrap.getBoundingClientRect().height
          - this.smooth.vars.height;
        // this.smooth.resize();
        }
      }
    } else if (this.inited) {
      const wWidth = this.smooth.vars.width > document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : this.smooth.vars.width;

      this.smooth.vars.bounding = this.wrap.getBoundingClientRect().width
          - wWidth;
    }
  }

  scrollHorizontal(e) {
    let { target } = this.smooth.vars;
    const width = this.wrap.scrollWidth - window.innerWidth;

    if (e && e.type === 'wheel') {
      e.preventDefault();
      target += ((e.deltaY / 10) * 4);
    }
    if (e && e.code === 'ArrowRight') {
      target += 20;
    }
    if (e && e.code === 'ArrowLeft') {
      target -= 20;
    }

    this.smooth.vars.target = target;
    if (target < 0) {
      this.smooth.vars.target = 0;
    } else if (target > width) {
      this.smooth.vars.target = width;
    }
  }

  setHorizontalScroll() {
    if (!this.isHorizontal) return;
    if (isTouch) {
      this.resetBounding();
    } else {
      window.addEventListener('wheel', this.scrollHorizontal.bind(this), { passive: false });
      window.addEventListener('keydown', this.scrollHorizontal.bind(this));
    }
  }

  resize() {
    this.resetBounding();
    this.initPlugin();
  }

  init() {
    if (!this.wrap) return;
    if (!this.isHorizontal && isTouch) return;

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
