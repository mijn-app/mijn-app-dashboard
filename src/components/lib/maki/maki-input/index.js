import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

import '../maki-shaded-paper';

export default class MakiInput extends PolymerElement {
  static get properties() {
    return {
      iconLeft: {
        type: Boolean,
        value: false,
      },
      iconRight: {
        type: Boolean,
        value: false,
      },
      placeholder: {
        type: String,
      },
      focussed: {
        type: Boolean,
        value: false,
      },
      type: {
        type: String,
        value: '',
      },
      value: {
        type: String,
        value: '',
      },
      inputCallback: {
        type: Function,
        value: () => {},
      },

      // Props: Shaded Paper
      accentDisabled: {
        type: Boolean,
      },
      accentError: {
        type: Boolean,
      },
      accentPrimary: {
        type: Boolean,
      },
      accentSecondary: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      error: {
        type: Boolean,
      },
      fill: {
        type: Boolean,
      },
      primary: {
        type: Boolean,
      },
      secondary: {
        type: Boolean,
      },
      transparent: {
        type: Boolean,
      },

      // Props: Paper
      elevation: {
        type: Number,
      },
      rounding: {
        type: Number,
      },
      stroke: {
        type: Number,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    let field = this.shadowRoot.querySelector('.Input');
    field.addEventListener('focus', this._onFocus.bind(this));
    field.addEventListener('blur', this._onBlur.bind(this));
  }

  _onBlur() {
    this.focussed = false;
  }
  _onFocus() {
    this.focussed = true;
  }
  _onInput(e) {
    this.inputCallback(e.target.value);
  }
  _isFocussed(focussed) {
    return focussed ? ' focussed' : '';
  }

  _hasIconLeft(iconLeft) {
    return iconLeft ? ' iconLeft' : '';
  }
  _hasIconRight(iconRight) {
    return iconRight ? ' iconRight' : '';
  }
}

window.customElements.define('maki-input', MakiInput);
