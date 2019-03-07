
import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';
import '../../dumbs/sk-button';
import '../mad-sidebar';

export default class SkApp extends PolymerElement {
  static get properties() {
    return {
      name: {
        type: String,
      },
      appVersion: {
        type: String,
        value: process.env.appVersion, // eslint-disable-line
      },
      ENV: {
        type: String,
        value: process.env.NODE_ENV, // eslint-disable-line
      },
      updateReady: {
        type: Boolean,
        value: false,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();

    document.addEventListener('updateReady', () => {
      this.updateReady = true;
    });
  }

  startTour() {
    window.location.replace('https://github.com/PolymerX/polymer-skeleton');
  }

  reload() {
    window.location.reload();
  }
}

window.customElements.define('sk-app', SkApp);
