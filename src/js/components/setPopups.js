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


  onOpen() {
    if (scroll && scroll.inited) scroll.smooth.off();
    this.getElements();

    const {
      imgsSmNumber, imgsSmSrcset, imgLgSrc, itemMeta, imgLgThumb,
    } = this.btn.dataset;

    if (this.imgLg && imgLgSrc && imgLgThumb) {
      this.imgLg.style.backgroundImage = `url('${imgLgSrc}')`;
      const img = new Image();
      img.src = imgLgThumb;
      this.imgLg.appendChild(img);
    }

    if (imgsSmSrcset) {
      this.imgSmSrcset = imgsSmSrcset.split(',');


      this.imgSmSrcset.forEach((src) => {
        const wrap = document.createElement('div');
        const img = document.createElement('div');

        wrap.className = 'popup-gallery__img-sm';
        img.className = 'popup-gallery-img';
        img.style.backgroundImage = `url('${src}')`;
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
    if (scroll && scroll.inited) scroll.smooth.on();
    this.getElements();
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
