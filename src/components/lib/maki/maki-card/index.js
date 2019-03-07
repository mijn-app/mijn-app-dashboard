import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

import '../maki-paper';

export default class MakiCard extends PolymerElement {
  static get properties() {
    return {
      label: {
        type: String,
        value: '',
      },
      heading: {
        type: String,
        value: '',
      },
      elevation: {
        type: Number,
        value: 5,
      },
      rounding: {
        type: Number,
        value: 3,
      },
      padding: {
        type: Number,
        value: 10,
      },
      paddingOverride: {
        type: String,
      },
      stroke: {
        type: Number,
        value: 0,
      },
      separator: {
        type: Boolean,
        value: false,
      },
      topSeparator: {
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

  hasLabel() {
    return this.label && this.label.trim().length > 0 ? true : false;
  }
  hasHeading() {
    return this.heading && this.heading.trim().length > 0 ? true : false;
  }
  hasHeader() {
    return this.hasLabel() || this.hasHeading();
  }
  getPadding(padding, paddingOverride) {
    if (paddingOverride) {
      return `padding: ${paddingOverride};`;
    }
    if (padding) {
      return `padding: ${padding}px;`;
    }
  }
}

window.customElements.define('maki-card', MakiCard);
