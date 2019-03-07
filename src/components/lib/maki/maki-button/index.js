import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MakiButton extends PolymerElement {
  static get properties() {
    return {
      setColorMain: {
        type: String,
        value: '#19224c',
        observer: '_colorChanged',
      },
      setColorHighlight: {
        type: String,
        value: '#ff6261',
        observer: '_colorChanged',
      },
      setColorDisabled: {
        type: String,
        value: '#dfe2e5',
        observer: '_colorChanged',
      },
      highlight: {
        type: Boolean,
        value: false,
      },
      italic: {
        type: Boolean,
        value: false,
      },
      small: {
        type: Boolean,
        value: false,
        observer: '_smallChanged',
      },
      size: {
        type: Number,
        value: 46,
      },
      fontSize: {
        type: Number,
        value: 14,
      },
      elevation: {
        type: Number,
        value: 0,
      },
      stroke: {
        type: Number,
        value: 1,
      },
      heading: {
        type: String,
      },
      white: {
        type: Boolean,
        value: false,
      },
      round: {
        type: Boolean,
        value: false,
      },
      disabled: {
        type: Boolean,
        value: false,
      },
      listenersAdded: {
        type: Boolean,
        value: false,
      },
      _hovering: {
        type: Boolean,
        value: false,
      },
      _hoverStyle: {
        type: String,
        value: '',
      },

      // Effect
      onClick: {
        type: Function,
        value: () => {},
      },

      // Color flags
      iconColorMain: {
        type: Boolean,
        value: false,
      },
      iconColorHighlight: {
        type: Boolean,
        value: false,
      },
      iconColorDisabled: {
        type: Boolean,
        value: false,
      },
      textColorMain: {
        type: Boolean,
        value: false,
      },
      textColorHighlight: {
        type: Boolean,
        value: false,
      },
      textColorDisabled: {
        type: Boolean,
        value: false,
      },
      bubbleColorMain: {
        type: Boolean,
        value: false,
      },
      bubbleColorHighlight: {
        type: Boolean,
        value: false,
      },
      bubbleColorDisabled: {
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

  ready() {
    super.ready();
    if (this.small) {
      this.addHover();
    }
    this._colorChanged();
  }

  _colorChanged() {
    let button = this.shadowRoot.querySelector('.Button');
    button.style.setProperty('--main-color', this.setColorMain);
    button.style.setProperty('--highlight-color', this.setColorHighlight);
    button.style.setProperty('--disabled-color', this.setColorDisabled);
    button.style.setProperty(
      '--bubble-svg-main',
      this._bubbleGenerator(this.setColorMain)
    );
    button.style.setProperty(
      '--bubble-svg-highlight',
      this._bubbleGenerator(this.setColorHighlight)
    );
    button.style.setProperty(
      '--bubble-svg-disabled',
      this._bubbleGenerator(this.setColorDisabled)
    );
  }

  _bubbleGenerator(color) {
    let svg = btoa(
      `<svg height="5px" width="10px" viewBox="0 0 4 2" version="1.1" xmlns="http://www.w3.org/2000/svg" >` +
        `<g transform="rotate(45, 2, 2) translate(0.63212 0.63212)" fill="${color ||
          '#19224c'}">` +
        `<rect x="0" y="0" width="4" height="4" />` +
        `</g>` +
        `</svg>`
    );
    return `data:image/svg+xml;base64,${svg}`;
  }

  _smallChanged(next, prev) {
    if (next !== prev) {
      if (next) {
        this.addHover();
      } else {
        this.removeHover();
      }
    }
  }

  addHover() {
    if (!this.listenersAdded) {
      this.addEventListener('mouseover', this.showHover);
      this.addEventListener('mouseout', this.hideHover);
      this.listenersAdded = true;
    }
  }
  removeHover() {
    if (this.listenersAdded) {
      this.removeEventListener('mouseover', this.showHover);
      this.removeEventListener('mouseout', this.hideHover);
      this.listenersAdded = false;
      this.hideHover();
    }
  }
  showHover() {
    let button = this.shadowRoot
      .querySelector('.Button')
      .getBoundingClientRect();
    let label = this.shadowRoot
      .querySelector('.HeadingAsProp')
      .getBoundingClientRect();
    let bubbleSvg = this.shadowRoot.querySelector('.After');

    if (this.bubbleColorMain) {
      bubbleSvg.style.backgroundImage = `url('${this._bubbleGenerator(
        this.setColorMain
      )}')`;
    } else if (this.bubbleColorDisabled) {
      bubbleSvg.style.backgroundImage = `url('${this._bubbleGenerator(
        this.setColorDisabled
      )}')`;
    } else if (this.bubbleColorHighlight) {
      bubbleSvg.style.backgroundImage = `url('${this._bubbleGenerator(
        this.setColorHighlight
      )}')`;
    } else if (this.disabled) {
      bubbleSvg.style.backgroundImage = `url('${this._bubbleGenerator(
        this.setColorDisabled
      )}')`;
    } else {
      bubbleSvg.style.backgroundImage = `url('${this._bubbleGenerator(
        this.setColorMain
      )}')`;
    }

    let x = button.left + button.width / 2 - label.width / 2;
    let y = button.top + button.height + 2;
    this._hoverStyle = `position: fixed; top: ${y}px; left: ${x}px;`;
    this._hovering = true;
  }
  hideHover() {
    this._hoverStyle = '';
    this._hovering = false;
  }

  clickHandler(e) {
    if (typeof this.onClick === 'function') {
      this.onClick(e);
    }
  }

  hasHeading(heading) {
    return heading && heading.trim().length > 0 ? true : false;
  }

  isHighlight(highlight) {
    return highlight ? ' highlight' : '';
  }

  isItalic(italic) {
    return italic ? ' italic' : '';
  }

  isSmall(small) {
    return small ? ' small' : '';
  }

  isWhite(white) {
    return white ? ' white' : '';
  }

  isDisabled(disabled) {
    return disabled ? ' disabled' : '';
  }

  isIcon(small, heading) {
    return this.hasHeading(heading) || small ? ' icon' : '';
  }

  _wrapperSize(size) {
    let marginLeft = size / 3.25;
    let borderWidth = this.stroke;
    if (this.round) {
      let borderRadius = size / 2;
      return [
        `border-radius: ${borderRadius}px;`,
        `margin-left: ${marginLeft}px;`,
        `border-width: ${borderWidth}px;`,
      ].join(' ');
    }
    return [
      `margin-left: ${marginLeft}px;`,
      `border-width: ${borderWidth}px;`,
    ].join(' ');
  }

  _buttonSize(size, heading) {
    let innerHeight = size - 2 * this.stroke;
    let fontSize = this.fontSize;
    let height = Math.floor(this.fontSize * 1.25);
    let vPad = (innerHeight - height) / 2;
    let lPad = vPad * 1.75;
    let rPad = vPad * 2;
    let width = 'auto';

    if (this.hasHeading(heading) || this.small) {
      lPad = innerHeight;
    }
    if (this.small) {
      rPad = 0;
      width = '0px';
    }

    return [
      `height: ${height}px;`,
      `line-height: ${height}px;`,
      `font-size: ${fontSize}px;`,
      `padding: ${vPad}px ${rPad}px ${vPad}px ${lPad}px;`,
      `width: ${width};`,
    ].join(' ');
  }

  _iconSize(size, heading) {
    if (this.hasHeading(heading) || this.small) {
      let innerHeight = size - 2 * this.stroke;
      let height = size * 0.66;
      let width = height;
      let pos = (innerHeight - height) / 2;

      return [
        `height: ${height}px;`,
        `width: ${width}px;`,
        `left: ${pos}px;`,
        `top: ${pos}px;`,
      ].join(' ');
    }
    return '';
  }

  colorBooleans(
    iconColorMain,
    iconColorDisabled,
    iconColorHighlight,
    textColorMain,
    textColorDisabled,
    textColorHighlight,
    bubbleColorMain,
    bubbleColorDisabled,
    bubbleColorHighlight
  ) {
    let returnable = '';

    // Icon colors
    if (iconColorMain) {
      returnable += ' iconColorMain';
    } else if (iconColorDisabled) {
      returnable += ' iconColorDisabled';
    } else if (iconColorHighlight) {
      returnable += ' iconColorHighlight';
    }

    // Text colors
    if (textColorMain) {
      returnable += ' textColorMain';
    } else if (textColorDisabled) {
      returnable += ' textColorDisabled';
    } else if (textColorHighlight) {
      returnable += ' textColorHighlight';
    }

    // Text colors
    if (bubbleColorMain) {
      returnable += ' bubbleColorMain';
    } else if (bubbleColorDisabled) {
      returnable += ' bubbleColorDisabled';
    } else if (bubbleColorHighlight) {
      returnable += ' bubbleColorHighlight';
    }

    return returnable;
  }

  getElevation(elevation) {
    if (elevation && !isNaN(elevation)) {
      elevation = parseInt(elevation);
      if (elevation > 24) {
        elevation = 24;
      } else if (elevation < 0) {
        elevation = 0;
      }
      let color = elevation * 2 + 1;
      if (color < 10) {
        color = 10;
      }
      return `box-shadow: 0 ${elevation}px ${elevation * 2 -
        1}px 0 rgba(0, 0, 0, ${color / 100});`;
    }
    return '';
  }
}

window.customElements.define('maki-button', MakiButton);
