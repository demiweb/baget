// import scroll from './setSmoothScrolling';

// console.log(scroll);


class ScrollTo {
  constructor(app) {
    this.isHorizontal = app.scroll.options.direction === 'horizontal';
    this.scroll = app.scroll;
  }

  _scroll() {
    document.addEventListener('click', (e) => {
      this.btn = e.target.closest('.js-scroll-to');
      if (!this.btn) return;

      this.name = this.btn.getAttribute(ScrollTo.constants.dataBtn);
      this.section = document.querySelector(`.${ScrollTo.constants.section}[${ScrollTo.constants.dataTarget}="${this.name}"]`);
      const left = this.section
        ? this.section.getBoundingClientRect().left
        - this.scroll.wrap.getBoundingClientRect().left
        : +this.name;
      const top = this.section
        ? this.section.getBoundingClientRect().top
        - this.scroll.wrap.getBoundingClientRect().top
        : +this.name;

      this.target = this.isHorizontal ? left : top;

      this.scroll.smooth.scrollTo(this.target);
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

export default function scrollTo(app) {
  const scrollToTarget = new ScrollTo(app);
  scrollToTarget.init();
}
