class Tabs {
  init() {
    this._initTabs();
  }

  destroy() {
    this._destroy();
  }

  toggleTabs(e) {
    this.btn = e.target.closest(`.${Tabs.classNames.tab}`);
    if (!this.btn) return;

    e.preventDefault();
    this.wrap = this.btn.closest(`.${Tabs.classNames.wrap}`);
    if (!this.wrap) return;

    this.tabs = [].slice.call(this.wrap.querySelectorAll(`.${Tabs.classNames.tab}`));
    this.items = [].slice.call(this.wrap.querySelectorAll(`.${Tabs.classNames.item}`));
    this.tabName = this.btn.dataset.targetTab;
    this.item = this.wrap.querySelector(`[data-tab="${this.tabName}"]`);

    if (this.tabs.length > 0 && this.tabs.length === this.items.length) {
      const itemsLength = this.tabs.length;

      for (let i = 0; i < itemsLength; i++) {
        this.tabs[i].classList.remove(Tabs.classNames.active);
        this.items[i].classList.remove(Tabs.classNames.active);
      }

      this.btn.classList.add(Tabs.classNames.active);
      this.item.classList.add(Tabs.classNames.active);

      if (this.onToggle) {
        this.onToggle();
      }
    }
  }

  _initTabs() {
    this.toggleTabsBinded = this.toggleTabs.bind(this);
    document.addEventListener('click', this.toggleTabsBinded);
  }

  _destroy() {
    document.removeEventListener('click', this.toggleTabsBinded);
  }
}

Tabs.classNames = {
  wrap: 'js-tabs',
  tab: 'js-tab',
  item: 'js-tabs-item',
  active: 'is-active',
};

export default function setTabs() {
  const tabs = new Tabs();
  tabs.onToggle = () => {
    const map = tabs.wrap.querySelector('.js-map-iframe');
    const tour = tabs.wrap.querySelector('.js-panorama-iframe');
    const { mapSrc, tourSrc } = tabs.btn.dataset;
    map.src = mapSrc;
    tour.src = tourSrc;
  };
  tabs.init();
}
