import Popup from '../lib/popup';
// import scroll from './setSmoothScrolling';

class MyPopup extends Popup {
  constructor(app) {
    super();
    this.scroll = app.scroll;
  }

  getElements() {
    this.imgLg = this.popup.querySelector('.js-gallery-img-popup');
    this.imgsSmWrap = this.popup.querySelector('.js-gallery-img-sm-wrap');
    this.metaWrap = this.popup.querySelector('.js-gallery-item-meta');
    this.title = this.popup.querySelector('.js-gallery-item-title');
    this.priceList = this.popup.querySelector('.js-gallery-item-price');
  }

  onOpen() {
    if (this.scroll && this.scroll.inited) this.scroll.smooth.off();
    this.getElements();

    const {
      imgsSmSrcset, imgLgSrc, itemMeta, imgLgThumb, imgsSmPopupSrcset,
    } = this.btn.dataset;
    const itemTitle = this.btn.querySelector('.js-item-title');
    const priceList = this.btn.querySelector('.js-item-price-list');

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
      this.imgsSmPopupSrcset = imgsSmPopupSrcset ? imgsSmPopupSrcset.split(',') : [];

      this.imgSmSrcset.forEach((src, i) => {
        const wrap = document.createElement('div');
        const img = document.createElement('button');

        wrap.className = 'popup-gallery__img-sm';
        img.className = 'popup-gallery-img';
        img.style.backgroundImage = `url('${src}')`;

        if (this.imgsSmPopupSrcset.length > 0) {
          img.classList.add('js-popup-open');
          img.setAttribute('data-popup-target', 'lightbox');
          img.setAttribute('data-img-lg-src', this.imgsSmPopupSrcset[i]);
        }

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
    if (this.title && itemTitle) {
      this.title.innerHTML = itemTitle.innerHTML;
    }
    if (this.priceList && priceList) {
      this.priceList.innerHTML = priceList.innerHTML;
    }
  }

  onClose() {
    if (!this.openPopups.length && this.scroll && this.scroll.inited) {
      this.scroll.smooth.on();
    }
    this.getElements();

    if (this.imgLg) {
      this.imgLg.style.backgroundImage = '';
      this.imgLg.style.backgroundPosition = '';
      this.imgLg.innerHTML = '';
    }
    if (this.imgsSmWrap) this.imgsSmWrap.innerHTML = '';
    if (this.metaWrap) this.metaWrap.innerHTML = '';
    if (this.priceList) this.priceList.innerHTML = '';
    if (this.title) this.title.innerHTML = '';
  }
}

export default function setPopups(app) {
  const popup = new MyPopup(app);
  popup.init();
}
