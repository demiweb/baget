import Select from 'select-custom';

class CustomSelect {
  constructor(select, params) {
    this.select = select;
    this.name = select.dataset.type;
    this.params = params[this.name];
  }

  addSelectsPlaceholder() {
    const HAS_PLACEHOLDER = 'has-placeholder';

    let placeholder;
    [].slice.call(this.select.options).forEach((option) => {
      if (option.value === 'placeholder') {
        placeholder = option.innerText;
      }


      if (option.value === 'placeholder') {
        placeholder = option.innerText;
        this.wrap.classList.add(HAS_PLACEHOLDER);
        if (this.select.multiple) {
          this.opener.innerText = placeholder;
        }
      }
    });

    this.select.addEventListener('change', (e) => {
      const selectedOptions = [].slice.call(e.currentTarget.options).filter((option) => {
        if (option.selected && option.value !== 'placeholder') {
          return option;
        }
        return null;
      });

      if (selectedOptions.length > 0) {
        this.wrap.classList.remove(HAS_PLACEHOLDER);
      }
      if (e.currentTarget.value !== 'placeholder') {
        this.wrap.classList.remove(HAS_PLACEHOLDER);
      }

      if (
        (e.currentTarget.value === 'placeholder' && !selectedOptions.length)
      || !e.currentTarget.value
      ) {
        this.wrap.classList.add(HAS_PLACEHOLDER);
        this.opener.innerText = placeholder;
      }
    });
  }


  getElements() {
    this.wrap = this.select.parentNode;
    this.opener = this.wrap.querySelector('.custom-select__opener');
    this.panel = this.wrap.querySelector('.custom-select__panel');
    this.options = [].slice.call(this.wrap.querySelectorAll('.custom-select__option'));
    this.input = this.wrap.querySelector('.js-search');
  }

  init() {
    this.Select = new Select(this.select, this.params);
    this.Select.init();
    this.getElements.call(this);

    // ================ helpers ======================
    this.addSelectsPlaceholder();
    // ================ helpers ======================
  }
}

export default function setSelects() {
  const selects = [].slice.call(document.querySelectorAll('.js-select'));
  if (!selects.length) return;


  const params = {
    with_checkboxes: {
      // multipleSelectOpenerText: { labels: true },
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
