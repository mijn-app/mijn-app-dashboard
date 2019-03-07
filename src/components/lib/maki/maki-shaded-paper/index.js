import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

import '../maki-paper';

export default class MakiShadedPaper extends PolymerElement {
  static get properties() {
    return {
      accentDisabled: {
        type: Boolean,
        value: false,
      },
      accentError: {
        type: Boolean,
        value: false,
      },
      accentPrimary: {
        type: Boolean,
        value: false,
      },
      accentSecondary: {
        type: Boolean,
        value: false,
      },
      disabled: {
        type: Boolean,
        value: false,
      },
      error: {
        type: Boolean,
        value: false,
      },
      fill: {
        type: Boolean,
        value: false,
      },
      iconDisabled: {
        type: Boolean,
        value: false,
      },
      iconError: {
        type: Boolean,
        value: false,
      },
      iconPrimary: {
        type: Boolean,
        value: false,
      },
      iconSecondary: {
        type: Boolean,
        value: false,
      },
      primary: {
        type: Boolean,
        value: false,
      },
      secondary: {
        type: Boolean,
        value: false,
      },
      transparent: {
        type: Boolean,
        value: false,
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

  _isTransparent(transparent) {
    return transparent ? ' transparent' : '';
  }
  _isPrimary(primary) {
    return primary ? ' primary' : '';
  }
  _isSecondary(secondary) {
    return secondary ? ' secondary' : '';
  }
  _isError(error) {
    return error ? ' error' : '';
  }
  _isDisabled(disabled) {
    return disabled ? ' disabled' : '';
  }
  _isAccentPrimary(accentPrimary) {
    return accentPrimary ? ' accentPrimary' : '';
  }
  _isAccentSecondary(accentSecondary) {
    return accentSecondary ? ' accentSecondary' : '';
  }
  _isAccentError(accentError) {
    return accentError ? ' accentError' : '';
  }
  _isAccentDisabled(accentDisabled) {
    return accentDisabled ? ' accentDisabled' : '';
  }
  _isIconPrimary(iconPrimary) {
    return iconPrimary ? ' iconPrimary' : '';
  }
  _isIconSecondary(iconSecondary) {
    return iconSecondary ? ' iconSecondary' : '';
  }
  _isIconError(iconError) {
    return iconError ? ' iconError' : '';
  }
  _isIconDisabled(iconDisabled) {
    return iconDisabled ? ' iconDisabled' : '';
  }
  _isFill(fill) {
    return fill ? ' fill' : '';
  }
}

window.customElements.define('maki-shaded-paper', MakiShadedPaper);
