import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MakiPaper extends PolymerElement {
  static get properties() {
    return {
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

  _borderStyle(stroke) {
    return `border-width: ${stroke}px;`;
  }
  _roundingStyle(rounding) {
    if (rounding < 0) {
      rounding = 0;
    }
    return `border-radius: ${rounding}px;`;
  }
  _elevationStyle(elevation) {
    if (elevation < 0) {
      elevation = 0;
    }
    if (elevation > 24) {
      elevation = 24;
    }
    return `box-shadow: var(--shadows-${elevation});`;
  }
}

window.customElements.define('maki-paper', MakiPaper);
