import IMask from 'imask';

class Mask {
  constructor(input, getOptions) {
    this.input = input;
    this.type = input.dataset.maskType;
    this.mask = input.dataset.mask;

    this.options = getOptions({
      mask: this.mask || '+{38}(000)000-00-00',
    })[this.type];
  }

  init() {
    this.plugin = IMask(this.input, this.options);
  }
}

export default function setInputMask() {
  const maskedInputs = [...document.querySelectorAll('.js-mask')];

  if (!maskedInputs.length) return;

  function getOptions({ mask }) {
    return {
      phone: {
        mask,
        // lazy: false,
      },
    };
  }

  maskedInputs.forEach((input) => {
    const myMask = new Mask(input, getOptions);
    myMask.init();
  });
}
