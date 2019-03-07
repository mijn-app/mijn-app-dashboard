import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

import '../maki-shaded-paper';

export default class MakiDropDown extends PolymerElement {
  static get properties() {
    return {
      placeholder: {
        type: String,
      },
      items: {
        type: Array,
        value: [],
      },
      names: {
        type: Array,
        value: [],
      },
      selected: {
        type: String,
        value: null,
      },
      selectCallback: {
        type: Function,
        value: () => {},
      },
      open: {
        type: Boolean,
        value: false,
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
  }

  _openDropDown() {
    let dropDown = this.shadowRoot
      .querySelector('.DropDown')
      .getBoundingClientRect();
    this.style.setProperty('--popup-pos-left', `${dropDown.left}px`);
    this.style.setProperty('--popup-pos-width', `${dropDown.width - 1}px`);
    this.style.setProperty('--popup-pos-top', `${dropDown.top}px`);
    this.open = true;
  }

  _closeDropDown() {
    this.open = false;
  }

  _selectedName(selected, items, names, placeholder) {
    if (!this._isPlaceholder(selected)) {
      let index = items.indexOf(selected);
      if (index > -1) {
        return names.length > index ? names[index] : selected;
      }
    }

    return placeholder ? placeholder : 'Kies een optie...';
  }

  _itemToName(item, items, names) {
    if (this.items && this.items.length > 0) {
      let index = items.indexOf(item);
      if (index > -1) {
        return names.length > index &&
          names[index] !== null &&
          names[index] !== undefined
          ? names[index]
          : typeof item === 'function'
            ? 'function'
            : item;
      }
    }
  }

  _setOption(e) {
    if (e && e.target && e.target.dataItem) {
      this._closeDropDown();
      if (typeof e.target.dataItem === 'function') {
        e.target.dataItem('wow');
        this.selected = null;
      } else {
        this.selected = e.target.dataItem;
        if (typeof this.selectCallback === 'function') {
          this.selectCallback(e.target.dataItem);
        }
      }
    }
  }

  _isFunction(item) {
    return typeof item === 'function' ? ' isFunction' : '';
  }

  _stylePlaceholder(selected) {
    return this._isPlaceholder(selected) ? ' placeholder' : '';
  }

  _isPlaceholder(selected) {
    return !(selected && this.items && this.items.length > 0);
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

window.customElements.define('maki-drop-down', MakiDropDown);
