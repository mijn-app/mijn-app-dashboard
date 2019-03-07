import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../redux/store';

import { selectPage } from '../../../redux/actions/application';
import { orderClear } from '../../../redux/actions/order';

import { JOURNEY_START, JOURNEY_END } from '../../../helpers/common';

import css from './style.pcss';
import template from './template.html';
import '@polymer/iron-pages';

import '../../lib/playback-screens/playback-screen-agree';
import '../../lib/playback-screens/playback-screen-calendar';
import '../../lib/playback-screens/playback-screen-end';
import '../../lib/playback-screens/playback-screen-error';
import '../../lib/playback-screens/playback-screen-multiple';
import '../../lib/playback-screens/playback-screen-multiple-text';
import '../../lib/playback-screens/playback-screen-radio-buttons';
import '../../lib/playback-screens/playback-screen-single';
import '../../lib/playback-screens/playback-screen-start';
import '../../lib/playback-screens/playback-screen-text';
import '../../lib/playback-screens/playback-screen-video';

import '../../lib/maki/maki-button';
import '../../lib/maki-icons/maki-icon-left-arrow';

export default class MadScreenPlayback extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _backToEditor() {
    store.dispatch(orderClear());
    store.dispatch(selectPage('journey'));
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
    this.screen = this.question.type;
  }
}

window.customElements.define('mad-screen-playback', MadScreenPlayback);
