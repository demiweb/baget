import Popup from '../lib/popup';
import scroll from './setSmoothScrolling';

export default function setPopups() {
  const popup = new Popup();
  popup.onOpen = () => {
    scroll.smooth.off();

    if (popup.name === 'material') {
      const imgLg = popup.popup.querySelector('.js-gallery-img-popup');
      const imgsSmWrap = popup.popup.querySelector('.js-gallery-img-sm-wrap');
      // const imgsSm = [...popup.popup.querySelectorAll('.js-gallery-img-sm-popup')];
      const { imgsSmNumber, imgsSmSrc, imgLgSrc } = popup.btn.dataset;

      const imgsSmSrcArray = [];
      const imgsSm = [];

      imgLg.style.backgroundImage = `url('${imgLgSrc}')`;

      for (let i = 0; i < +imgsSmNumber; i++) {
        // create array of srcs for small images
        const imgNmb = i <= 9 ? `0${i + 1}` : i + 1;
        const src = imgsSmSrc.replace(/{number}/i, imgNmb);
        imgsSmSrcArray.push(src);

        // create img elements
        const wrap = document.createElement('div');
        const img = document.createElement('div');

        wrap.className = 'popup-gallery__img-sm';
        img.className = 'popup-gallery-img';
        wrap.appendChild(img);
        imgsSmWrap.appendChild(wrap);

        imgsSm.push(img);
      }

      imgsSm.forEach((el, i) => {
        const img = el;
        img.style.backgroundImage = `url('${imgsSmSrcArray[i]}')`;
      });
    }

    if (popup.name === 'lightbox') {
      const imgLg = popup.popup.querySelector('.js-gallery-img-popup');
      const { imgLgSrc } = popup.btn.dataset;
      imgLg.style.backgroundImage = `url('${imgLgSrc}')`;
    }
  };
  popup.onClose = () => {
    scroll.smooth.on();

    if (popup.name === 'material') {
      const imgLg = popup.popup.querySelector('.js-gallery-img-popup');
      const imgsSmWrap = popup.popup.querySelector('.js-gallery-img-sm-wrap');

      if (imgLg) {
        imgLg.style.backgroundImage = '';
      }
      if (imgsSmWrap) {
        imgsSmWrap.innerHTML = '';
      }
    }

    if (popup.name === 'lightbox') {
      const imgLg = popup.popup.querySelector('.js-gallery-img-popup');
      if (imgLg) {
        imgLg.style.backgroundImage = '';
      }
    }
  };
  popup.init();
}
