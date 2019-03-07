import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../redux/store';

import css from './style.pcss';
import template from './template.html';

export default class MadScreenAction extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _orderItems(order) {
    return order && order.data ? order.data : [];
  }

  _isNested(item) {
    return Array.isArray(item.key);
  }

  _isNotNested(item) {
    return !Array.isArray(item.key);
  }

  _shortId(id) {
    return id ? id.split('-')[id.split('-').length - 1] : '';
  }

  _key(key) {
    return key.replace(': ', '\n');
  }

  _makeNested(item) {
    return item.key.map((o, i) => ({
      key: o,
      value: item.value[i],
      keyTitle: item.keyTitle[i],
      valueTitle: item.valueTitle[i],
    }));
  }

  _orderPersoon(order) {
    return order && order.user
      ? `${order.user.first_name} ${order.user.last_name}`
      : '';
  }

  _stateChanged(state) {
    this.order = state.orders.item;
  }
}

window.customElements.define('mad-screen-action', MadScreenAction);
