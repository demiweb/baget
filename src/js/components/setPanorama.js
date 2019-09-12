import * as THREE from 'three';
import * as PANOLENS from 'panolens';

class Panorama {
  constructor(wrap) {
    this.wrap = wrap;
    this.size = {
      width: wrap.offsetWidth,
      height: wrap.offsetHeight,
    };
    this.src = wrap.dataset.src;
  }

  _addScene() {
    this.panorama = new PANOLENS.ImagePanorama(this.src);
    this.viewer = new PANOLENS.Viewer({
      container: this.wrap,
    });
    this.viewer.OrbitControls.noZoom = true;
    this.viewer.add(this.panorama);
    this.viewer.container.style.width = this.size.width;
    this.viewer.container.style.height = this.size.height;
  }

  init() {
    this._addScene();
  }
}

export default function setPanorama() {
  const wrap = document.querySelector('.js-panorama');
  if (!wrap) return;

  const panorama = new Panorama(wrap);
  panorama.init();
}
