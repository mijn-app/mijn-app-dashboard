import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadArrowPart extends PolymerElement {
  static get properties() {
    return {
      point: {
        type: Boolean,
        value: false,
      },
      toDown: {
        type: Boolean,
        value: false,
      },
      toUp: {
        type: Boolean,
        value: false,
      },
      fromDown: {
        type: Boolean,
        value: false,
      },
      fromUp: {
        type: Boolean,
        value: false,
      },
      horizontal: {
        type: Boolean,
        value: false,
      },
      vertical: {
        type: Boolean,
        value: false,
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
      point = 'M25 2 l6 6-6 6';
    }
    this.shadowRoot.querySelector('#path').setAttribute('d', path);
    this.shadowRoot.querySelector('#point').setAttribute('d', point);
  }

  _pathGen() {
    let returnable = '';

    if (this.toDown || this.toUp) {
      returnable += 'M0 8';
      returnable += this._moveH(11);
    }

    if (this.toDown) {
      returnable += this._curveToDown();
      returnable += this._moveV(3);
    } else if (this.toUp) {
      returnable += this._curveToUp();
      returnable += this._moveV(-3);
    } else if (this.fromDown) {
      returnable += 'M16 16';
      returnable += this._moveV(-3);
      returnable += this._curveFromDown();
    } else if (this.fromUp) {
      returnable += 'M16 0';
      returnable += this._moveV(3);
      returnable += this._curveFromUp();
    } else if (this.horizontal) {
      returnable += 'M0 8';
      if (this.point) {
        returnable += this._moveH(31);
      } else {
        returnable += this._moveH(32);
      }
    } else if (this.vertical) {
      returnable += 'M16 0';
      returnable += this._moveV(16);
    }

    if (this.fromDown || this.fromUp) {
      if (this.point) {
        returnable += this._moveH(10);
      } else {
        returnable += this._moveH(11);
      }
    }

    return returnable;
  }

  _moveH(n) {
    return ` h${n}`;
  }

  _moveV(n) {
    return ` v${n}`;
  }

  _curveToDown() {
    return ` a5 5 0 0 1 5 5`;
  }

  _curveToUp() {
    return ` a5 5 0 0 0 5 -5`;
  }

  _curveFromDown() {
    return ` a5 5 0 0 1 5 -5`;
  }

  _curveFromUp() {
    return ` a5 5 0 0 0 5 5`;
  }

  constructor() {
    super();
  }
}

window.customElements.define('mad-arrow-part', MadArrowPart);
