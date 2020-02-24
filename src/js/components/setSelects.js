import Select from 'select-custom';
// import scroll from './setSmoothScrolling';

class CustomSelect {
  constructor(select, params) {
    this.select = select;
    this.name = select.dataset.type;
    this.params = params[this.name];
  }

  addSelectsPlaceholder() {
    let placeholder;
    [...this.select.options].forEach((option) => {
      if (option.value === 'placeholder') {
        placeholder = option.innerText || option.innerHTML;
      }

      if (option.value === 'placeholder') {
        placeholder = option.innerText || option.innerHTML;
        if (this.select.multiple) {
          this.opener.innerHTML = placeholder;
        }
      }
    });
  }

  getElements() {
    this.wrap = this.select.parentNode;
    this.opener = this.wrap.querySelector('.custom-select__opener');
    this.panel = this.wrap.querySelector('.custom-select__panel');
    this.options = [...this.wrap.querySelectorAll('.custom-select__option')];
    this.input = this.wrap.querySelector('.js-search');
  }

  addCustomClassNames() {
    this.panel.className += ' scrollbar js-scrollbar js-scrolled-el';
  }

  init() {
    this.Select = new Select(this.select, this.params);
    this.Select.init();
    this.getElements.call(this);

    // ================ helpers ======================
    this.addSelectsPlaceholder();
    this.addCustomClassNames();
    // ================ helpers ======================
  }
}

export default function setSelects() {
  const selects = [...document.querySelectorAll('.js-select')];
  if (!selects.length) return;


  const params = {
    with_checkboxes: {
      changeOpenerText: false,
      optionBuilder: (option, customOption) => {
        const inner = customOption.innerHTML;
        const chOption = customOption;

        if (customOption.dataset.value === 'placeholder') {
          chOption.innerHTML = inner;
        } else {
          chOption.innerHTML = `<div class="checkbox"><input type="checkbox" /> <span>${inner}</span></div>`;
        }
      },
    },
  };

  selects.forEach((select) => {
    const customSelect = new CustomSelect(select, params);
    customSelect.init();
  });
}
