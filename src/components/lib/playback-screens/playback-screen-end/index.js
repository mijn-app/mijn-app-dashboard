import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../redux/store';

import {
  orderSaveAnswer,
  orderClearAnswer,
} from '../../../../redux/actions/order';

import { JOURNEY_START, JOURNEY_END } from '../../../../helpers/common';

import css from './style.pcss';
import template from './template.html';

import { orderPrev } from '../../../../redux/actions/order';

import '../../playback-screen-wrapper';

export default class PlaybackScreenEnd extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _nextCallback(question) {
    return (next) => {
      if (question && question.next) {
        next(question.next);
      }
    };
  }

  _prev() {
    store.dispatch(orderPrev());
  }

  _getOrderItems(order) {
    let returnable = [];
    order.filter((o) => o.question && o.question !== 'END').forEach((o) => {
      if (Array.isArray(o.valueTitle)) {
        let addin = o.valueTitle.map((o) => ({ value: o }));
        o.keyTitle.forEach((o, i) => (addin[i].key = o));
        returnable = [...returnable, ...addin];
      } else {
        returnable.push({ key: o.keyTitle, value: o.valueTitle });
      }
    });
    return returnable;
  }

  _skipCallback(question) {
    if (question && question.optional && question.optional.goto) {
      return (skip) => skip(question.optional.goto);
    }
    return null;
  }

  _isDisabled() {
    return false;
  }

  _stateChanged(state) {
    this.journey = state.journey;
    this.current = state.order.current;
    this.id = this.current === JOURNEY_START ? JOURNEY_START : JOURNEY_END;
    this.order = state.order.data;
  }
}

window.customElements.define('playback-screen-end', PlaybackScreenEnd);
