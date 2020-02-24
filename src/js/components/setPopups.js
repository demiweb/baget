import Popup from '../lib/popup';
import scroll from './setSmoothScrolling';

class MyPopup extends Popup {
  // constructor() {
  //   // super();

  //   this.imgSmSrcset = [];
  //   this.imgsSm = [];
  // }

  getElements() {
    this.imgLg = this.popup.querySelector('.js-gallery-img-popup');
    this.imgsSmWrap = this.popup.querySelector('.js-gallery-img-sm-wrap');
    this.metaWrap = this.popup.querySelector('.js-gallery-item-meta');
  }

  onOpen() {
    if (scroll && scroll.inited) scroll.smooth.off();
    this.getElements();

    const {
      imgsSmNumber, imgsSmSrcset, imgLgSrc, itemMeta, imgLgThumb, imgsSmPopupSrcset,
    } = this.btn.dataset;

    if (this.imgLg && imgLgSrc) {
      this.imgLg.style.backgroundImage = `url('${imgLgSrc}')`;

      if (imgLgThumb) {
        this.imgLgThumb = new Image();
        this.imgLgThumb.src = imgLgThumb;
        this.imgLg.appendChild(this.imgLgThumb);
      }
    }

    if (imgsSmSrcset) {
      this.imgSmSrcset = imgsSmSrcset.split(',');
      this.imgsSmPopupSrcset = imgsSmPopupSrcset.split(',');


      this.imgSmSrcset.forEach((src, i) => {
        const wrap = document.createElement('div');
        const img = document.createElement('button');

        wrap.className = 'popup-gallery__img-sm';
        img.className = 'popup-gallery-img js-popup-open';
        img.style.backgroundImage = `url('${src}')`;
        img.setAttribute('data-popup-target', 'lightbox');
        img.setAttribute('data-img-lg-src', this.imgsSmPopupSrcset[i]);
        wrap.appendChild(img);
        this.imgsSmWrap.appendChild(wrap);
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
    if (!this.openPopups.length && scroll && scroll.inited) {
      scroll.smooth.on();
    }
    this.getElements();

    if (this.imgLg) {
      this.imgLg.style.backgroundImage = '';
      this.imgLg.innerHTML = '';
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
