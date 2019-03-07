import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../../redux/store';
import { orderNext } from '../../../../redux/actions/order';

import {
  JOURNEY_START,
  JOURNEY_END,
  QUESTION_TYPE_END,
} from '../../../../helpers/common';

import css from './style.pcss';
import template from './template.html';

export default class PlaybackScreenStart extends connect(store)(
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

  _title(journey) {
    return journey && journey.title ? journey.title : 'Naamloze klantvraag';
  }

  _subtitle(journey) {
    return journey && journey.overview && journey.overview.subtitle
      ? journey.overview.subtitle
      : 'Geen subtitel';
  }

  _indexToCount(index) {
    return !isNaN(index) ? index + 1 : 1;
  }

  _documents(journey) {
    return journey &&
      journey.overview &&
      journey.overview.needed_documents &&
      Array.isArray(journey.overview.needed_documents)
      ? journey.overview.needed_documents
      : [];
  }

  _steps(journey) {
    return journey &&
      journey.overview &&
      journey.overview.steps &&
      Array.isArray(journey.overview.steps)
      ? journey.overview.steps
      : [];
  }

  _start(journey) {
    return () => {
      if (
        journey &&
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0 &&
        journey.questions[0].id
      ) {
        store.dispatch(orderNext(journey.questions[0].id));
      } else {
        store.dispatch(orderNext(JOURNEY_END));
      }
    };
  }

  _stateChanged(state) {
    this.journey = state.journey;
    this.id =
      state.order.current === JOURNEY_START
        ? JOURNEY_START
        : state.order.data[state.order.current].question;
    if (this.id === JOURNEY_START) {
      this.question = { type: 'start' };
    } else if (this.id === JOURNEY_END) {
      this.question = { type: 'end' };
    } else if (this.journey) {
      this.question = (this.journey.questions || []).find(
        (q) => q.id === this.id
      );
    }
    if (!this.question) {
      this.question = '';
    }
  }
}

window.customElements.define('playback-screen-start', PlaybackScreenStart);
