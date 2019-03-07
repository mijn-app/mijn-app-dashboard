import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../redux/store';
import { orderNext, orderSaveAnswer } from '../../../../redux/actions/order';

import { JOURNEY_START } from '../../../../helpers/common';

import css from './style.pcss';
import template from './template.html';

import '../../playback-screen-wrapper';

export default class PlaybackScreenVideo extends connect(store)(
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

  _optionNames(question) {
    return question && question.options && Array.isArray(question.options)
      ? question.options.map((o) => (o.title ? o.title : 'Naamloze optie'))
      : [];
  }

  _optionClick(e) {
    if (e && e.target && e.target.dataQuestion && !isNaN(e.target.dataIndex)) {
      let question = e.target.dataQuestion;
      let index = e.target.dataIndex;
      if (
        question &&
        question.options &&
        Array.isArray(question.options) &&
        question.options.length > index &&
        question.options[index] &&
        question.options[index].goto
      ) {
        store.dispatch(
          orderSaveAnswer(
            question.key || question.title,
            question.options[index].value || question.options[index].title,
            question.title,
            question.options[index].title
          )
        );
        store.dispatch(orderNext(question.options[index].goto));
      }
    }
  }

  _skipCallback(question) {
    if (question && question.optional && question.optional.goto) {
      return (skip) => skip(question.optional.goto);
    }
    return null;
  }

  _stateChanged(state) {
    this.journey = state.journey;
    this.id =
      state.order.current === JOURNEY_START
        ? JOURNEY_START
        : state.order.data[state.order.current].question;
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

window.customElements.define('playback-screen-video', PlaybackScreenVideo);
