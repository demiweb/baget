import scroll from './setSmoothScrolling';

class ScrollTo {
  constructor() {
    this.isHorizontal = scroll.options.direction === 'horizontal';
  }

  _scroll() {
    document.addEventListener('click', (e) => {
      this.btn = e.target.closest('.js-scroll-to');
      if (!this.btn) return;

      this.name = this.btn.getAttribute(ScrollTo.constants.dataBtn);
      this.section = document.querySelector(`.${ScrollTo.constants.section}[${ScrollTo.constants.dataTarget}="${this.name}"]`);
      const left = this.section.getBoundingClientRect().left
        - scroll.wrap.getBoundingClientRect().left;
      const top = this.section.getBoundingClientRect().top
        - scroll.wrap.getBoundingClientRect().top;

      this.target = this.isHorizontal ? left : top;

      scroll.smooth.scrollTo(this.target);
    });
  }

  init() {
    this._scroll();
  }
}

ScrollTo.constants = {
  btn: 'js-scroll-to',
  section: 'js-scroll-to-section',
  dataBtn: 'data-scroll-to',
  dataTarget: 'data-scroll-to-section',
};

export default function scrollTo() {
  const scrollToTarget = new ScrollTo();
  scrollToTarget.init();
}
