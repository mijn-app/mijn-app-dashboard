import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../redux/store';

import {
  orderSaveAnswer,
  orderClearAnswer,
} from '../../../../redux/actions/order';

import { JOURNEY_START } from '../../../../helpers/common';

import css from './style.pcss';
import template from './template.html';

import '../../playback-screen-wrapper';
import '../../maki/maki-input';

export default class PlaybackScreenText extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _title(question) {
    return question && question.title ? question.title : 'Naamloze vraag';
  }

  _inputCallback(question) {
    return (data) => {
      store.dispatch(
        orderSaveAnswer(
          question.key || question.title,
          data,
          question.title,
          data
        )
      );
    };
  }

  _getValue(order) {
    return order && order.value ? order.value : '';
  }

  _nextCallback(question) {
    return (next) => {
      if (question && question.next) {
        next(question.next);
      }
    };
  }

  _skipCallback(question) {
    if (question && question.optional && question.optional.goto) {
      return (skip) => skip(question.optional.goto);
    }
    return null;
  }

  _isDisabled(order) {
    return !this._getValue(order);
  }

  _stateChanged(state) {
    this.journey = state.journey;
    this.current = state.order.current;
    this.id =
      this.current === JOURNEY_START
        ? JOURNEY_START
        : state.order.data[this.current].question;
    this.order =
      this.current === JOURNEY_START ? {} : state.order.data[this.current];
    this.selected = this.order._tracker;
    if (this.journey) {
      this.question = (this.journey.questions || []).find(
        (q) => q.id === this.id
      );
    }
    if (!this.question) {
      this.question = '';
    }
  }
}

window.customElements.define('playback-screen-text', PlaybackScreenText);
