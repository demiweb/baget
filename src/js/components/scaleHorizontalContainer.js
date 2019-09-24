export default function scaleHorizontalContainer() {
  const IS_SCALED = 'is-scaled';

  function toggleScale(el, state) {
    if (state) {
      el.classList.add(IS_SCALED);
    } else {
      el.classList.remove(IS_SCALED);
    }
  }

  const { header, footer } = {
    header: this.wrap.querySelector('header'),
    footer: this.wrap.querySelector('footer'),
  };

  if (header && footer) {
    if (this.smooth.vars.current <= header.offsetWidth / 2) {
      toggleScale(this.wrap, false);
    } else if (this.smooth.vars.current > this.smooth.vars.bounding - footer.offsetWidth / 2) {
      toggleScale(this.wrap, false);
    } else if (this.smooth.vars.current > header.offsetWidth / 2
        && this.smooth.vars.current < this.width - footer.offsetWidth / 2) {
      toggleScale(this.wrap, true);
    }
  }
}
