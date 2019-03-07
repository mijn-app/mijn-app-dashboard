import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class MadSidebarItem extends PolymerElement {
  static get properties() {
    return {
      selected: {
        type: Boolean,
        value: false,
        observer: '_changed',
      },
      notifications: {
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

  isSelectedClass(selected) {
    return selected ? 'selected' : '';
  }

  hasNotifications(notifications) {
    return notifications > 0;
  }
}

window.customElements.define('mad-sidebar-item', MadSidebarItem);
