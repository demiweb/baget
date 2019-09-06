import 'lightgallery.js';
import 'lg-zoom.js';
import 'lg-fullscreen.js';
import 'lg-autoplay.js';
import 'lg-share.js';
import 'lg-thumbnail.js';
// import 'lg-video.js';

export default function setgallery() {
  const lgs = [...document.querySelectorAll('.js-lightgallery')];

  if (!lgs.length) return;

  lgs.forEach((lg) => {
    // eslint-disable-next-line
    lightGallery(lg, {
      exThumbImage: 'data-exthumbimage',
    });
  });
}
