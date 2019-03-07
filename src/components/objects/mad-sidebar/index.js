
import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadSidebar extends PolymerElement {
  static get properties() {
    return {
      heading: {
        type: String,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }
}

window.customElements.define('mad-sidebar', MadSidebar);
