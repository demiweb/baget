import { isTouch } from '../helpers';

export default () => {
  if (isTouch) return;

  const className = 'js-zoom-image';

  function onMousemove(e) {
    const figure = e.target.closest(`.${className}`);
    if (!figure) return;

    const { offsetX, offsetY } = e;

    const x = (offsetX / figure.offsetWidth) * 100;
    const y = (offsetY / figure.offsetHeight) * 100;

    figure.style.backgroundPosition = `${x}% ${y}%`;
  }

  document.addEventListener('mousemove', onMousemove);
};
