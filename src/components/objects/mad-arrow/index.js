import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadArrow extends PolymerElement {
  static get properties() {
    return {
      point: {
        type: Boolean,
        value: false,
      },
      before: {
        type: Number,
        value: 0,
      },
      after: {
        type: Number,
        value: 0,
      },
      length: {
        type: Number,
        value: 0,
      },
      _curX: {
        type: Number,
        value: 0,
      },
      _curY: {
        type: Number,
        value: 7,
      },
      _curW: {
        type: Number,
        value: 1,
      },
      _curPreW: {
        type: Number,
        value: 0,
      },
      _curH: {
        type: Number,
        value: 14,
      },
      _curPreH: {
        type: Number,
        value: 0,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  ready() {
    super.ready();
    this._change();
  }

  _change() {
    let path = this._pathGen();
    let point = '';
    if (this.point) {
      point = this._pointGen();
    }
    this.shadowRoot.querySelector('#path').setAttribute('d', path);
    this.shadowRoot.querySelector('#point').setAttribute('d', point);
    this.shadowRoot
      .querySelector('#parent')
      .setAttribute('width', this._curW - this._curPreW);
    this.shadowRoot
      .querySelector('#parent')
      .setAttribute('height', this._curH - this._curPreH);
    this.shadowRoot
      .querySelector('#parent')
      .setAttribute(
        'viewBox',
        `${this._curPreW} ${this._curPreH} ${this._curW - this._curPreW} ${this
          ._curH - this._curPreH}`
      );
  }

  _pathGen() {
    let returnable = 'M0 7';
    returnable += this._moveH(10);

    returnable +=
      this.before && this.before !== 0 ? this._moveV(this.before) : '';
    returnable +=
      this.length && this.length !== 0 ? this._moveH(this.length) : '';
    returnable += this.after && this.after !== 0 ? this._moveV(this.after) : '';

    returnable += this._moveH(10);
    return returnable;
  }

  _pointGen() {
    return `M${this._curX - 6} ${this._curY - 6} l6 6-6 6`;
  }

  _addX(n) {
    let offset = 1;
    this._curX = this._curX + n;
    if (this._curX + offset > this._curW) {
      this._curW = this._curX + offset;
    }
    if (this._curX < this._curPreW) {
      this._curPreW = this._curX;
    }
  }

  _addY(n) {
    let offset = 7;
    this._curY = this._curY + n;
    if (this._curY + offset > this._curH) {
      this._curH = this._curY + offset;
    }
    if (this._curY - offset < this._curPreH) {
      this._curPreH = this._curY - offset;
    }
  }

  _moveH(n) {
    this._addX(n);
    return ` h${n}`;
  }

  _moveV(n) {
    this._addX(10);
    this._addY(n);
    if (n > 0) {
      return ` a5 5 0 0 1 5 5 v${n - 10} a5 5 0 0 0 5 5`;
    } else if (n < 0) {
      return ` a5 5 0 0 0 5 -5 v${n + 10} a5 5 0 0 1 5 -5`;
    }
    return;
  }

  constructor() {
    super();
  }
}

window.customElements.define('mad-arrow', MadArrow);
