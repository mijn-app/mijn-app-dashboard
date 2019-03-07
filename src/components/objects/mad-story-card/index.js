import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';
import '../../lib/maki/maki-card';
import '../../icons/mad-icon-lock';

export default class MadStoryCard extends PolymerElement {
  static get properties() {
    return {
      locked: {
        type: Boolean,
        value: false,
      },
      warn: {
        type: Boolean,
        value: false,
      },
      question: {
        type: String,
      },
      number: {
        type: Number,
        value: 0,
      },
      label: {
        type: String,
      },
      heading: {
        type: String,
      },
      callback: {
        type: Object,
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

  _clickHandler(e) {
    if (typeof this.callback === 'function') {
      this.callback(this.question, this.number, e);
    }
  }
}

window.customElements.define('mad-story-card', MadStoryCard);
