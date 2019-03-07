import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { store } from '../../../redux/store';
import {
  selectPage,
  selectPageNoHistory,
} from '../../../redux/actions/application';
import { connect } from 'pwa-helpers/connect-mixin';
import { primaryPalette, secondaryPalette } from '../../../helpers/palettes';

import css from './style.pcss';
import template from './template.html';
import '@polymer/iron-pages';

import '../mad-screen-action';
import '../mad-screen-actions';
import '../mad-screen-home';
import '../mad-screen-journey';
import '../mad-screen-journeys';
import '../mad-screen-playback';

import '../../objects/mad-sidebar';
import '../../objects/mad-sidebar/mad-sidebar-item';

import '../../lib/maki/maki-theme-provider';

import { MakiTheme } from '../../lib/maki/maki-theme-provider';

export default class MadApp extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      heading: {
        type: String,
      },
      theme: {
        type: Object,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
    window.onpopstate = function(event) {
      store.dispatch(selectPageNoHistory(event.state));
    };
    if (window.location.pathname && window.location.pathname.length > 0) {
      let path = window.location.pathname
        .split(/[/-]/)
        .filter((i) => i.length > 0);
      store.dispatch(selectPageNoHistory(path[0]));
    }
  }

  ready() {
    super.ready();
    let theme = {
      palette: {
        primary: {
          light: '#d6dce2',
          main: primaryPalette[500] || '#19224c',
          dark: primaryPalette[500] || '#19224c',
        },
        secondary: {
          light: secondaryPalette[300],
          main: secondaryPalette[500],
          dark: secondaryPalette[800],
        },
      },
      shadows: {},
    };

    for (let i = 0; i < 25; i++) {
      let color = i * 2 + 1;
      if (color < 10) {
        color = 10;
      }
      theme.shadows[i] = `0px ${i}px ${i * 2 - 1}px 0px rgba(0, 0, 0, ${color /
        100})`;
    }

    this.theme = new MakiTheme().set(theme);

    var self = this;

    const f = () => {
      setTimeout(function() {
        self.theme = new MakiTheme();
        setTimeout(function() {
          self.theme = new MakiTheme().set(theme);
          f();
        }, 500);
      }, 2500);
    };

    // f();
  }

  _selectedPage(page, current) {
    const DASHBOARD = 'dashboard';
    const JOURNEYS = 'journeys';
    if (page === current) {
      return true;
    }
    let alias = '';
    switch (page) {
      case '':
        alias = DASHBOARD;
        break;
      case 'editor':
      case 'journey':
        alias = JOURNEYS;
        break;
      default:
        alias = 'none';
    }
    return alias === current;
  }

  _selectPage(e) {
    if (e.target) {
      let target = e.target.getAttribute('data-page');
      if (
        target !== 'journeys' &&
        target !== 'journey' &&
        target !== 'playback' &&
        target !== 'actions'
      ) {
        let doPop = confirm(
          'Deze functie komt binnenkort beschikbaar! Op dit moment wordt er ' +
            'hard gewerkt aan nieuwe functionaliteiten van Mijn ' +
            'Portaal.\n\nHeb je feedback? Laat het ons weten via de website. ' +
            'Klik op \'OK\' om naar de website te gaan.'
        );
        if (doPop) {
          window.open(
            'https://mijn-app.io/dienstverlener/index.html',
            '_blank'
          );
        }
      } else if (target) {
        store.dispatch(selectPage(target));
      }
    }
  }

  _stateChanged(state) {
    this.page = state.application.page;
  }
}

window.customElements.define('mad-app', MadApp);
