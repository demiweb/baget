// import scroll from './setSmoothScrolling';

class HomePage {
  constructor(page, app) {
    this.page = page;
    this.header = page.querySelector('.header-hor');
    this.headerInner = page.querySelector('.header-hor__inner');
    this.scroll = app.scroll;
  }

  setPosition() {
    if (!this.header || !this.headerInner) return;
    if (this.header.offsetWidth < window.innerWidth) return;

    const { left } = this.headerInner.getBoundingClientRect();
    this.scroll.smooth.scrollTo(left);
  }

  init() {
    this.setPosition();
  }
}

export default function setHomePagePosition(app) {
  const horPage = document.querySelector('.horizontal-page');

  if (!horPage) return;

  const homePage = new HomePage(horPage, app);
  homePage.init();
}
