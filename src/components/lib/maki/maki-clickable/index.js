import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MakiClickable extends PolymerElement {
  static get properties() {
    return {
      // Props: Paper
      elevation: {
        type: Number,
        value: 5,
      },
      rounding: {
        type: Number,
        value: 3,
      },
      stroke: {
        type: Number,
        value: 0,
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

window.customElements.define('maki-clickable', MakiClickable);
