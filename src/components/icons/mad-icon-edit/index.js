
import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadIconEdit extends PolymerElement {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }
}

window.customElements.define('mad-icon-edit', MadIconEdit);
