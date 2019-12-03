import Popup from 'popup-simple';
import scroll from './setSmoothScrolling';

class MyPopup extends Popup {
  constructor() {
    super();

    this.imgSmSrcset = [];
    this.imgsSm = [];
  }

  getElements() {
    this.imgLg = this.popup.querySelector('.js-gallery-img-popup');
    this.imgsSmWrap = this.popup.querySelector('.js-gallery-img-sm-wrap');
    this.metaWrap = this.popup.querySelector('.js-gallery-item-meta');
  }

  cleareArrays() {
    this.imgSmSrcset = [];
    this.imgsSm = [];
  }

  onOpen() {
    if (scroll && scroll.inited) scroll.smooth.off();
    this.getElements();

    const {
      imgsSmNumber, imgsSmSrcset, imgLgSrc, itemMeta,
    } = this.btn.dataset;

    if (this.imgLg && imgLgSrc) {
      this.imgLg.style.backgroundImage = `url('${imgLgSrc}')`;
    }

    if (imgsSmNumber && imgsSmSrcset) {
      for (let i = 0; i < +imgsSmNumber; i++) {
      // create array of srcs for small images
        const imgNmb = i < 9 ? `0${i + 1}` : i + 1;
        const src = imgsSmSrcset.replace(/{number}/i, imgNmb);
        this.imgSmSrcset.push(src);

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
        img.style.backgroundImage = `url('${this.imgSmSrcset[i]}')`;
      });
    }

    if (this.metaWrap && itemMeta) {
      const meta = JSON.parse(itemMeta);
      const keys = Object.keys(meta);
      const values = Object.values(meta);

      const metaList = keys
        .map((key, i) => `<li>${key}: <strong>${values[i]}</strong></li>`)
        .join('');

      this.metaWrap.innerHTML = `
        <ul>
          ${metaList}
        </ul>
      `;
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
