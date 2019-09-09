export default function animateBgText(position) {
  const els = [...document.querySelectorAll('.js-bg-text')];
  if (!els.length) return;

  els.forEach((el) => {
    const title = el;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.style.transform = `translate(${position}px, 0px)`;
        }
      });
    });
    observer.observe(title);
  });
}
