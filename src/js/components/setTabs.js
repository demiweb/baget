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

    this.tabs = [...this.wrap.querySelectorAll(`.${Tabs.classNames.tab}`)];
    this.items = [...this.wrap.querySelectorAll(`.${Tabs.classNames.item}`)];
    this.tabName = this.btn.dataset.targetTab;
    this.targetItems = [...this.wrap.querySelectorAll(`[data-tab="${this.tabName}"]`)];


    this.tabs.forEach((tab) => tab.classList.remove(Tabs.classNames.active));
    this.items.forEach((item) => item.classList.remove(Tabs.classNames.active));

    this.btn.classList.add(Tabs.classNames.active);
    this.targetItems.forEach((item) => item.classList.add(Tabs.classNames.active));

    if (this.onToggle) {
      this.onToggle();
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
  // tabs.onToggle = () => {
  //   // const map = tabs.wrap.querySelector('.js-map-iframe');
  //   // const tour = tabs.wrap.querySelector('.js-panorama-iframe');
  //   // const { mapSrc, tourSrc } = tabs.btn.dataset;
  //   // map.src = mapSrc;
  //   // tour.src = tourSrc;
  // };
  tabs.init();
}
