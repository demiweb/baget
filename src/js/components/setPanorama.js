// import * as THREE from 'three';
import * as PANOLENS from 'panolens';
import { debounce } from 'throttle-debounce';

class Panorama {
  constructor(wrap) {
    this.wrap = wrap;
    this.size = {
      width: wrap.offsetWidth,
      height: wrap.offsetHeight,
    };
    this.images = {
      path: wrap.dataset.path,
      format: wrap.dataset.format,
    };
  }

  // setSize() {
  //   console.log(this.viewer.renderer.domElement);
  // }

  addControlPanelStyles() {
    const panel = this.viewer.widget.barElement;

    panel.style.position = 'absolute';
    panel.style.bottom = '0';
    panel.style.left = '0';
    panel.style.width = '100%';
    panel.style.transform = '';
  }

  _addScene() {
    const { path, format } = this.images;

    this.panorama = new PANOLENS.CubePanorama([
      `${path}px${format}`, `${path}nx${format}`,
      `${path}py${format}`, `${path}ny${format}`,
      `${path}pz${format}`, `${path}nz${format}`,
    ]);
    this.viewer = new PANOLENS.Viewer({
      container: this.wrap,
      // cameraFov: 120,
    });
    this.viewer.OrbitControls.noZoom = true;

    this.addControlPanelStyles();

    this.viewer.add(this.panorama);
  }

  // resize() {
  //   this.setSize();
  // }

  // _resize() {
  //   this.onResize = debounce(300, this.resize.bind(this));
  //   // window.addEventListener('resize', this.onResize);
  // }

  init() {
    this._addScene();
    // this._resize();
  }
}

export default function setPanorama() {
  const wrap = document.querySelector('.js-panorama');
  if (!wrap) return;

  const panorama = new Panorama(wrap);
  panorama.init();
}
