import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadMain extends PolymerElement {
  static get properties() {
    return {
      heading: {
        type: String,
      },
      subHeading: {
        type: String,
      },
      backText: {
        type: String,
        value: null,
      },
      back: {
        type: Function,
        value: () => {},
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  hasBackButton() {
    return this.backText && this.backText.trim().length > 0 ? true : false;
  }

  hasSubHeading() {
    return this.subHeading && this.subHeading.trim().length > 0 ? true : false;
  }

  _backClick(e) {
    if (typeof this.back === 'function') {
      this.back(e);
    }
  }
}

window.customElements.define('mad-main', MadMain);
