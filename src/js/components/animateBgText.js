export default function animateBgText(index) {
  const els = [].slice.call(document.querySelectorAll('.js-bg-text'));

  if (!els.length) return;

  els.forEach((el) => {
    const title = el;

    let { top } = title.getBoundingClientRect();
    const titleHeight = title.offsetHeight;
    top += titleHeight;

    if (top < 0) return;
    console.log(index);
    title.style.transform = `translate(${index}px, 0px)`;
  });
}
