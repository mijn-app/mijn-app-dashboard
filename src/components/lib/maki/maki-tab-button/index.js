import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MakiTabButton extends PolymerElement {
  static get properties() {
    return {
      selected: {
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
  }

  isSelected() {
    return this.selected ? 'selected' : '';
  }
}

window.customElements.define('maki-tab-button', MakiTabButton);
