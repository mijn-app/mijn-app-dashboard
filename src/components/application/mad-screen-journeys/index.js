import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { store } from '../../../redux/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { setJourney } from '../../../redux/actions/journey';
import { selectPage } from '../../../redux/actions/application';

import css from './style.pcss';
import template from './template.html';

import '../../lib/maki/maki-button';
import '../../lib/maki/maki-tab-button';
import '../../lib/maki/maki-card';
import '../../lib/maki-icons/maki-icon-add';
import '../../lib/maki-icons/maki-icon-search';

import '../../objects/mad-main';

export default class MadScreenJourneys extends connect(store)(PolymerElement) {
  static get properties() {
    return {};
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  _clickJourneyA() {
    store.dispatch(setJourney(this.journeys[0]));
    store.dispatch(selectPage('journey'));
  }
  _clickJourneyB() {
    store.dispatch(setJourney(this.journeys[1]));
    store.dispatch(selectPage('journey'));
  }

  _toEditor() {
    store.dispatch(setJourney());
    store.dispatch(selectPage('journey'));
  }

  _stateChanged(state) {
    this.journeys = state.journeys.data;
    this.journeysCount = state.journeys.data.length;
  }
}

window.customElements.define('mad-screen-journeys', MadScreenJourneys);
