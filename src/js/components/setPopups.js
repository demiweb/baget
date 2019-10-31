import Popup from 'popup-simple';
import scroll from './setSmoothScrolling';

class MyPopup extends Popup {
  constructor() {
    super();

    this.imgsSmSrcs = [];
    this.imgsSm = [];
  }

  getElements() {
    this.imgLg = this.popup.querySelector('.js-gallery-img-popup');
    this.imgsSmWrap = this.popup.querySelector('.js-gallery-img-sm-wrap');
  }

  cleareArrays() {
    this.imgsSmSrcs = [];
    this.imgsSm = [];
  }

  onOpen() {
    if (scroll && scroll.inited) scroll.smooth.off();
    this.getElements();

    const { imgsSmNumber, imgsSmSrc, imgLgSrc } = this.btn.dataset;

    if (this.imgLg && imgLgSrc) {
      this.imgLg.style.backgroundImage = `url('${imgLgSrc}')`;
    }

    if (imgsSmNumber && imgsSmSrc) {
      for (let i = 0; i < +imgsSmNumber; i++) {
      // create array of srcs for small images
        const imgNmb = i < 9 ? `0${i + 1}` : i + 1;
        const src = imgsSmSrc.replace(/{number}/i, imgNmb);
        this.imgsSmSrcs.push(src);

        // create img elements
        const wrap = document.createElement('div');
        const img = document.createElement('div');

        wrap.className = 'popup-gallery__img-sm';
        img.className = 'popup-gallery-img';
        wrap.appendChild(img);
        this.imgsSmWrap.appendChild(wrap);

        this.imgsSm.push(img);
      }

      this.imgsSm.forEach((el, i) => {
        const img = el;
        img.style.backgroundImage = `url('${this.imgsSmSrcs[i]}')`;
      });
    }
  }

  onClose() {
    if (scroll && scroll.inited) scroll.smooth.on();
    this.getElements();
    this.cleareArrays();
    if (this.imgLg) {
      this.imgLg.style.backgroundImage = '';
    }
    if (this.imgsSmWrap) {
      this.imgsSmWrap.innerHTML = '';
    }
  }
}

export default function setPopups() {
  const popup = new MyPopup();
  popup.init();
}
