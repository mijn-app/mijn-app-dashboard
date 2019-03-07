import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../redux/store';
import { toDutchDate } from '../../../helpers/dutchDate';
import { setOrderItem } from '../../../redux/actions/orders';
import { selectPage } from '../../../redux/actions/application';

import css from './style.pcss';
import template from './template.html';

export default class MadScreenActions extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _newAction(journey) {
    let data = {};
    try {
      data = JSON.parse(journey.data);
    } catch (e) {}

    return {
      ...journey,
      data,
    };
  }

  _id(id) {
    return id.split('-')[id.split('-').length - 1];
  }

  _goOrder(e) {
    if (e && e.model && e.model.__data && e.model.__data.item) {
      store.dispatch(setOrderItem(e.model.__data.item));
      store.dispatch(selectPage('action'));
    }
  }

  _userName(item) {
    if (item && item.user && item.user.first_name && item.user.last_name) {
      return `${item.user.first_name} ${item.user.last_name}`;
    }
  }

  _toDate(date, add) {
    let d = new Date(date);
    if (add) {
      d.setDate(d.getDate() + 21);
    }
    return toDutchDate(d, true);
  }

  _getActions(orders) {
    return orders && Array.isArray(orders)
      ? orders.map((i) => {
        return this._newAction(i);
      })
      : [];
  }

  _stateChanged(state) {
    this.orders = state.orders.list;
  }
}

window.customElements.define('mad-screen-actions', MadScreenActions);
