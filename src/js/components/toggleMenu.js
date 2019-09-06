import { TimelineLite, Power2 } from 'gsap';
import {
  IS_ACTIVE, NO_SCROLL, IS_HIDDEN,
} from '../constants';

class Burger {
  init() {
    document.addEventListener('click', this.toggle.bind(this));
  }

  toggle(e) {
    this.btn = e.target.closest(`.${Burger.classNames.burger}`);
    if (!this.btn) return;

    e.preventDefault();
    e.stopPropagation();

    this.name = this.btn.getAttribute('data-menu-target');
    this.target = this.name
      ? document.querySelector(`.${Burger.classNames.menu}[data-menu="${this.name}"]`)
      : document.querySelector(`.${Burger.classNames.menu}`);

    this.btn.classList.toggle(IS_ACTIVE);
    this.target.classList.toggle(IS_ACTIVE);

    if (this.onToggle) {
      this.onToggle();
    }

    if (!this.target.classList.contains(IS_ACTIVE) && this.onClose) {
      this.onClose();
    }
  }

  close() {
    this.burgers = [...document.querySelectorAll(`.${Burger.classNames.burger}`)];
    this.targets = [...document.querySelectorAll(`.${Burger.classNames.menu}`)];

    if (this.burgers.length > 0 && this.targets.length > 0) {
      this.burgers.forEach((btn) => btn.classList.remove(IS_ACTIVE));
      this.targets.forEach((menu) => menu.classList.remove(IS_ACTIVE));


      if (this.onClose) {
        this.onClose();
      }
    }
  }
}

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu',
};

export default function toggleMenu() {
  const burger = new Burger();
  const tl = new TimelineLite();

  burger.onToggle = () => {
    document.body.classList.toggle(NO_SCROLL);
    const {
      nav,
      addresses,
      contacts,
    } = {
      nav: burger.target.querySelectorAll('.header__nav li'),
      addresses: burger.target.querySelectorAll('.header__address-mob .header-address-item'),
      contacts: burger.target.querySelectorAll('.header__contacts-mob a'),
    };
    tl
      .staggerFromTo(
        nav,
        0.5,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
      )
      .staggerFromTo(
        addresses,
        0.5,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
        '-=0.3',
      );
    if (window.matchMedia('(max-width: 575px)').matches) {
      tl
        .staggerFromTo(
          contacts,
          0.5,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          0.1,
          '-=0.3',
        );
    }
  };
  burger.onClose = () => {
    document.body.classList.remove(NO_SCROLL);
    console.log(burger);
  };
  burger.init();

  // close menu
  const close = 'js-menu-close';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest(`.${close}`);
    if (!btn) return;

    e.preventDefault();
    burger.close();
  });
}
