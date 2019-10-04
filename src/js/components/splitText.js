import Splitter from 'split-html-to-chars';

export default function splitText() {
  const textBlocks = [...document.querySelectorAll('.js-splitme')];

  if (!textBlocks.length) return;

  textBlocks.forEach((el) => {
    const block = el;
    block.outerHTML = Splitter(block.outerHTML, '<span class="letter">$</span>');
  });
}
