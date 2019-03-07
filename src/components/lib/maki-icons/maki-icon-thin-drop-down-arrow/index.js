
import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MakiIconThinDropDownArrow extends PolymerElement {
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

window.customElements.define('maki-icon-thin-drop-down-arrow', MakiIconThinDropDownArrow);
