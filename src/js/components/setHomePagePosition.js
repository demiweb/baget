import scroll from './setSmoothScrolling';

class HomePage {
  constructor(page) {
    this.page = page;
    this.header = page.querySelector('.header-hor');
    this.headerInner = page.querySelector('.header-hor__inner');
  }

  setPosition() {
    if (!this.header) return;
    if (!this.headerInner) return;
    if (this.header.offsetWidth < window.innerWidth) return;

    const { left } = this.headerInner.getBoundingClientRect();
    scroll.smooth.scrollTo(left);
  }

  init() {
    this.setPosition();
  }
}

export default function setHomePagePosition() {
  const horPage = document.querySelector('.horizontal-page');

  if (!horPage) return;

  const homePage = new HomePage(horPage);
  homePage.init();
}
