// import { IS_ANIMATE } from '../constants';

// class BgText {
//   constructor(el) {
//     this.el = el;
//   }

//   animate(entries, observer) {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         console.log(window.pageYOffset);

//         this.el.style.transform = `translateX(${window.pageYOffset}px)`;

//         this._createOptions();

//         observer.observe(this.el);

//         console.log(this.observerOptions);
//       }
//       // if (window.pageYOffset > 10) {
//       //   this.el.classList.add(IS_ANIMATE);
//       // } else {
//       //   this.el.classList.remove(IS_ANIMATE);
//       // }
//     });
//   }

//   _createOptions() {
//     const threshold = [];
//     for (let i = 0; i < 1000; i++) {
//       threshold.push(i / 1000);
//     }

//     const { top } = this.el.getBoundingClientRect();
//     const rootMargin = top > 0 ? `-${top}px` : '0px';

//     this.observerOptions = {
//       threshold,
//       rootMargin,
//     };
//   }

//   _animateElemet() {
//     this.observer = new IntersectionObserver(this.animate.bind(this), this.observerOptions);
//     this.observer.observe(this.el);
//   }

//   init() {
//     this._createOptions();
//     this._animateElemet();
//   }
// }

export default function animateBgText() {
  const els = [].slice.call(document.querySelectorAll('.js-bg-text'));

  if (!els.length) return;

  els.forEach((el) => {
    // const bgText = new BgText(title);
    // bgText.init();
    const title = el;

    window.addEventListener('scroll', (e) => {
      let { top } = title.getBoundingClientRect();
      const titleHeight = title.offsetHeight;
      top += titleHeight;

      if (top < 0) return;
      title.style.transform = `translate(${window.pageYOffset}px, 0px)`;
    });
  });
}
