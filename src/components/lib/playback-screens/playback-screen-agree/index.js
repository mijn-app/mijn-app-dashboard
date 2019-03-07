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

export default class PlaybackScreenAgree extends connect(store)(
  PolymerElement
) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _isSelected(order) {
    return order.value ? ' selected' : '';
  }

  _optionClick() {
    if (this.order && this.question) {
      if (this.order.value) {
        store.dispatch(orderClearAnswer());
      } else if (this.question.title) {
        store.dispatch(
          orderSaveAnswer(
            this.question.key || this.question.title,
            true,
            this.question.title,
            'Ja'
          )
        );
      }
    }
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
    return order && order.value ? false : true;
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

window.customElements.define('playback-screen-agree', PlaybackScreenAgree);
