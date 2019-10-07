// import 'lightgallery.js';
// import 'lg-zoom.js';
// import 'lg-fullscreen.js';
// import 'lg-autoplay.js';
// import 'lg-share.js';
// import 'lg-thumbnail.js';
// import 'lg-video.js';

export default function setgallery() {
  // const lgs = [...document.querySelectorAll('.js-lightgallery')];

  // if (!lgs.length) return;

  // lgs.forEach((lg) => {
  //   // eslint-disable-next-line
  //   lightGallery(lg, {
  //     exThumbImage: 'data-exthumbimage',
  //   });
  // });

  const checkboxes = [...document.querySelectorAll('.js-gallery-checkbox')];

  if (checkboxes && checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const calcBtn = document.querySelector('.js-popup-open[data-popup-target="calculator"]');
        if (!calcBtn) return;

        calcBtn.classList.add('bounceIn');

        setTimeout(() => {
          calcBtn.classList.remove('bounceIn');
        }, 1000);
      });
    });
  }
}
