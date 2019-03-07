import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';
import uuid from '../../../helpers/uuid';
import {
  typeToDisplayName,
  isDirectionalOptionsType,
  JOURNEY_END,
} from '../../../helpers/common';
import '../mad-story-card';
import '../mad-arrow-part';
import '../../lib/maki/maki-button';
import '../../lib/maki-icons/maki-icon-large-add';
import {
  addEndToQuestionNext,
  addLinkToQuestionNext,
  newQuestion,
} from '../../../redux/actions/journey';
import {
  uiSidePanelOpen,
  uiModulePickerOpen,
  uiSelectQuestion,
} from '../../../redux/actions/journeyUi';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../redux/store';

export default class MadEditor extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      questions: {
        type: Object,
        value: {},
      },
      placed: {
        type: Object,
        value: {},
      },
      grid: {
        type: Array,
        value: [],
      },
      gridHeight: {
        type: Number,
        value: 0,
      },
      drawArrowHack: {
        type: String,
      },
      withMenu: {
        type: String,
        value: null,
        observer: '_withMenuChanged',
      },
      styleLine: {
        type: String,
        value: null,
      },
    };
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this._updateJourney();
  }

  _specialMatch(selectedSpecial, item) {
    return selectedSpecial === item;
  }

  _withMenuChanged(next, prev) {
    if (next && next !== prev) {
      let el = this.shadowRoot.querySelector('.Story');
      setTimeout(function() {
        el.scrollLeft += 160;
      }, 100);
    }
  }

  _editQuestion(question, number) {
    if (question && number) {
      store.dispatch(uiSelectQuestion(question, number));
      store.dispatch(uiSidePanelOpen());
    }
  }

  _updateJourney() {
    this._parseData(this.journey);
  }

  _cardHeadingById(id) {
    if (id === 'START') {
      return 'Algemene informatie';
    }
    return this.questions[id] && this.questions[id].title
      ? this.questions[id].title
      : 'Naamloze vraag';
  }

  _cardLabelById(id) {
    let type;
    if (this.questions[id] && this.questions[id].type) {
      type = this.questions[id].type;
    }
    let title = typeToDisplayName(type);
    switch (title) {
      case undefined:
      case null:
        return 'Kies een module...';
      case 'start':
        return 'Overzicht';
      default:
        return title ? title : `__${type}__`;
    }
  }

  _clickAdd(target) {
    let self = this;
    return function() {
      self.withMenu = target;
    };
  }

  _hasOpenMenu(target, withMenu) {
    return withMenu === target;
  }
  _isMatch(a, b) {
    return a === b;
  }
  _isNotMatch(a, b) {
    return a !== b;
  }

  _clearWithMenu() {
    this.withMenu = null;
  }

  _addEndWithMenu() {
    let target = this.withMenu;
    this._clearWithMenu();
    store.dispatch(addEndToQuestionNext(target));
  }

  _addNewModule() {
    let target = this.withMenu;
    this._clearWithMenu();
    let newId = uuid();
    store.dispatch(newQuestion(newId));
    store.dispatch(addLinkToQuestionNext(target, newId));
    store.dispatch(uiSelectQuestion(newId, '+'));
    store.dispatch(uiSidePanelOpen());
    store.dispatch(uiModulePickerOpen());
  }

  _cardNumberById(id) {
    if (this.questions[id]) {
      return this.questions[id].number;
    }
  }

  _cardStyleById(id) {
    if (this.questions[id]) {
      let col = this.questions[id].gridCol;
      let row = 0;
      if (this.grid[col] && this.grid[col][id]) {
        row = this.grid[col][id];
      }
      return [
        `grid-column-start: tilecol${col + 1};`,
        `grid-column-end: arrowcol${col + 1};`,
        `grid-row-start: tilerow${row + 1};`,
        `grid-row-end: arrowrow${row + 1}_0;`,
      ].join('');
    }
  }

  _specialStyleById(id) {
    if (this.questions[id]) {
      let col = this.questions[id].gridCol;
      let row = 0;
      if (this.grid[col] && this.grid[col][id]) {
        row = this.grid[col][id];
      }
      return [
        `grid-column-start: tilecol${col + 1};`,
        `grid-column-end: arrowcol${col + 1};`,
        `grid-row-start: tilerow${row + 1};`,
        `grid-row-end: arrowrow${row + 1}_0;`,
      ].join('');
    }
  }

  _cardDomIdById(id) {
    return `story_card_${id}`;
  }

  _sidePanelOpenStyle(sidePanelOpen) {
    return sidePanelOpen ? ' sidePanelOpen' : '';
  }

  _parseData(data) {
    this.placed = {};
    this.drawArrowHack = '';
    this.grid = [];
    this.gridHeight = 0;
    this.questions = this._questionsFromData(data);
    this._questionsToGrid();

    let columnsInGrid = '';
    for (let i = 0; i < this.grid.length; i++) {
      columnsInGrid +=
        i === 0
          ? /* `[arrowcol${i}] 32px`*/ `[tilecol${i + 1}] auto [arrowcol${i +
              1}] 32px`
          : ` [tilecol${i + 1}] auto [arrowcol${i + 1}] 32px`;
    }
    let rowsInGrid = '';
    let arrowTopOffset = 42;
    for (let i = 0; i < this.gridHeight; i++) {
      rowsInGrid +=
        i === 0
          ? `[arrowrow${i}_0] 16px [tilerow${i +
              1}] ${arrowTopOffset}px [tilerowmiddle${i +
              1}] 16px [tilerowbottom${i + 1}] auto [arrowrow${i +
              1}_0] auto [arrowrow${i + 1}_1] auto`
          : ` [tilerow${i + 1}] ${arrowTopOffset}px [tilerowmiddle${i +
              1}] 16px [tilerowbottom${i + 1}] auto [arrowrow${i +
              1}_0] auto [arrowrow${i + 1}_1] auto`;
    }

    this._makeGridAbsolute();

    // let story = this.shadowRoot.querySelector('.Story');
    // story.style.setProperty('--grid-template-columns', columnsInGrid);
    // story.style.setProperty('--grid-template-rows', rowsInGrid);
    this.styleLine = [
      `grid-template-columns: ${columnsInGrid};`,
      `grid-template-rows: ${rowsInGrid}`,
    ].join(' ');

    // Draw arrows
    setTimeout(this._drawArrows.bind(this), 25);
  }

  _makeGridAbsolute() {
    this.grid = this.grid.map((column) => {
      let returnable = {};
      let count = 0;
      for (let i in column) {
        if (column[i]) {
          returnable[i] = count;
          count++;
        }
      }
      return returnable;
    });
  }

  _specialObjsAsArray(obj) {
    let objArray = [];
    for (let i in obj) {
      if (obj[i] && obj[i].special) {
        objArray.push(obj[i]);
      }
    }
    return objArray;
  }

  _objAsArray(obj) {
    let objArray = [];
    for (let i in obj) {
      if (obj[i] && obj[i].number) {
        objArray.push(obj[i]);
      }
    }
    return objArray;
  }

  _drawArrows() {
    this.drawArrowHack = new Date().getTime();
  }

  _arrowArray(timestamp) {
    if (timestamp === '') {
      return [];
    }
    let questions = this.questions;
    let grid = this.grid;
    let placed = this.placed;

    let links = {};

    // Collect all arrows that should be drawn
    for (let q in questions) {
      if (questions[q] && questions[q].id && placed[questions[q].id]) {
        let question = questions[q];
        let localLinks = [];
        // Has soft-link-thread
        if (question.thread) {
          localLinks.push(question.thread);
        }
        // Has next
        if (question.next) {
          localLinks.push(question.next);
        }
        // Has skip
        if (question.optional && question.optional.goto) {
          if (localLinks.indexOf(question.optional.goto) === -1) {
            localLinks.push(question.optional.goto);
          }
        }
        // Has options
        if (question.options && question.options.length > 0) {
          for (var i in question.options) {
            if (question.options[i] && question.options[i].goto) {
              if (localLinks.indexOf(question.options[i].goto) === -1) {
                localLinks.push(question.options[i].goto);
              }
            }
          }
        }
        // Save local links
        if (localLinks.length > 0) {
          links[questions[q].id] = localLinks;
        }
      }
    }

    // 

    // Arrow: {  }
    let arrows = [];
    const newArrow = (type, style, point) =>
      arrows.push({
        toDown: false,
        toUp: false,
        fromDown: false,
        fromUp: false,
        horizontal: false,
        vertical: false,
        ...{
          [type]: true,
        },
        point: point || false,
        style: style || '',
      });

    // Generate all arrows
    for (let a in links) {
      if (links[a] && Array.isArray(links[a]) && questions[a]) {
        let from = a;
        let fromCol = questions[a].gridCol;
        let fromRow = grid[fromCol][from];
        links[a].forEach((to) => {
          if (questions[to]) {
            let toCol = questions[to].gridCol;
            let toRow = grid[toCol][to];

            // Create the required arrows
            if (fromCol + 1 === toCol) {
              if (fromRow === toRow) {
                newArrow(
                  'horizontal',
                  [
                    `grid-column-start: arrowcol${fromCol + 1};`,
                    `grid-column-end: tilecol${fromCol + 2};`,
                    `grid-row-start: tilerowmiddle${fromRow + 1};`,
                    `grid-row-end: tilerowbottom${fromRow + 1};`,
                  ].join(''),
                  true
                );
              } else if (fromRow > toRow) {
                newArrow(
                  'toUp',
                  [
                    `grid-column-start: arrowcol${fromCol + 1};`,
                    `grid-column-end: tilecol${fromCol + 2};`,
                    `grid-row-start: tilerowmiddle${fromRow + 1};`,
                    `grid-row-end: tilerowbottom${fromRow + 1};`,
                  ].join('')
                );
                newArrow(
                  'vertical',
                  [
                    `grid-column-start: arrowcol${fromCol + 1};`,
                    `grid-column-end: tilecol${fromCol + 2};`,
                    `grid-row-start: tilerowbottom${toRow + 1};`,
                    `grid-row-end: tilerowmiddle${fromRow + 1};`,
                  ].join('')
                );
                newArrow(
                  'fromDown',
                  [
                    `grid-column-start: arrowcol${toCol};`,
                    `grid-column-end: tilecol${toCol + 1};`,
                    `grid-row-start: tilerowmiddle${toRow + 1};`,
                    `grid-row-end: tilerowbottom${toRow + 1};`,
                  ].join(''),
                  true
                );
              } else if (fromRow < toRow) {
                newArrow(
                  'toDown',
                  [
                    `grid-column-start: arrowcol${fromCol + 1};`,
                    `grid-column-end: tilecol${fromCol + 2};`,
                    `grid-row-start: tilerowmiddle${fromRow + 1};`,
                    `grid-row-end: tilerowbottom${fromRow + 1};`,
                  ].join('')
                );
                newArrow(
                  'vertical',
                  [
                    `grid-column-start: arrowcol${fromCol + 1};`,
                    `grid-column-end: tilecol${fromCol + 2};`,
                    `grid-row-start: tilerowbottom${fromRow + 1};`,
                    `grid-row-end: tilerowmiddle${toRow + 1};`,
                  ].join('')
                );
                newArrow(
                  'fromUp',
                  [
                    `grid-column-start: arrowcol${toCol};`,
                    `grid-column-end: tilecol${toCol + 1};`,
                    `grid-row-start: tilerowmiddle${toRow + 1};`,
                    `grid-row-end: tilerowbottom${toRow + 1};`,
                  ].join(''),
                  true
                );
              }
            } else if (fromCol + 1 < toCol) {
              newArrow(
                'toDown',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: tilerowmiddle${fromRow + 1};`,
                  `grid-row-end: tilerowbottom${fromRow + 1};`,
                ].join('')
              );
              newArrow(
                'vertical',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: tilerowbottom${fromRow + 1};`,
                  `grid-row-end: arrowrow${fromRow + 1}_0;`,
                ].join('')
              );
              newArrow(
                'fromUp',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: arrowrow${fromRow + 1}_0;`,
                  `grid-row-end: arrowrow${fromRow + 1}_1;`,
                  `height: 16px;`,
                ].join('')
              );
              newArrow(
                'horizontal',
                [
                  `grid-column-start: tilecol${fromCol + 2};`,
                  `grid-column-end: arrowcol${toCol};`,
                  `grid-row-start: arrowrow${fromRow + 1}_0;`,
                  `grid-row-end: arrowrow${fromRow + 1}_1;`,
                  `height: 16px;`,
                ].join('')
              );
              if (fromRow < toRow) {
                // TODO:
              } else {
                newArrow(
                  'toUp',
                  [
                    `grid-column-start: arrowcol${toCol};`,
                    `grid-column-end: tilecol${toCol + 1};`,
                    `grid-row-start: arrowrow${fromRow + 1}_0;`,
                    `grid-row-end: arrowrow${fromRow + 1}_1;`,
                    `height: 16px;`,
                  ].join('')
                );
                newArrow(
                  'vertical',
                  [
                    `grid-column-start: arrowcol${toCol};`,
                    `grid-column-end: tilecol${toCol + 1};`,
                    `grid-row-start: tilerowbottom${toRow + 1};`,
                    `grid-row-end: arrowrow${fromRow + 1}_0;`,
                  ].join('')
                );
                newArrow(
                  'fromDown',
                  [
                    `grid-column-start: arrowcol${toCol};`,
                    `grid-column-end: tilecol${toCol + 1};`,
                    `grid-row-start: tilerowmiddle${toRow + 1};`,
                    `grid-row-end: tilerowbottom${toRow + 1};`,
                  ].join(''),
                  true
                );
              }
            } else if (fromCol + 1 > toCol) {
              newArrow(
                'toUp',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: tilerowmiddle${fromRow + 1};`,
                  `grid-row-end: tilerowbottom${fromRow + 1};`,
                ].join('')
              );
              newArrow(
                'vertical',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: tilerow1;`,
                  `grid-row-end: tilerowmiddle${fromRow + 1};`,
                ].join('')
              );
              newArrow(
                'toDown',
                [
                  `grid-column-start: arrowcol${fromCol + 1};`,
                  `grid-column-end: tilecol${fromCol + 2};`,
                  `grid-row-start: arrowrow0_0;`,
                  `grid-row-end: tilerow1;`,
                  `height: 16px;`,
                ].join('')
              );
              newArrow(
                'horizontal',
                [
                  `grid-column-start: tilecol${toCol + 1};`,
                  `grid-column-end: arrowcol${fromCol + 1};`,
                  `grid-row-start: arrowrow0_0;`,
                  `grid-row-end: tilerow1;`,
                  `height: 16px;`,
                ].join('')
              );
              newArrow(
                'fromDown',
                [
                  `grid-column-start: arrowcol${toCol};`,
                  `grid-column-end: tilecol${toCol + 1};`,
                  `grid-row-start: arrowrow0_0;`,
                  `grid-row-end: tilerow1;`,
                  `height: 16px;`,
                ].join('')
              );
              newArrow(
                'vertical',
                [
                  `grid-column-start: arrowcol${toCol};`,
                  `grid-column-end: tilecol${toCol + 1};`,
                  `grid-row-start: tilerow1;`,
                  `grid-row-end: tilerowmiddle${toRow + 1};`,
                ].join('')
              );
              newArrow(
                'fromUp',
                [
                  `grid-column-start: arrowcol${toCol};`,
                  `grid-column-end: tilecol${toCol + 1};`,
                  `grid-row-start: tilerowmiddle${toRow + 1};`,
                  `grid-row-end: tilerowbottom${toRow + 1};`,
                ].join(''),
                true
              );
            }
          }
        });
      }
    }

    return arrows;
  }

  _questionsFromData(data) {
    let questions = {};
    let index = 1;
    if (data && data.overview) {
      questions['BEGIN'] = {
        thread: 'START',
        special: 'BEGIN',
        id: 'BEGIN',
      };
      questions['START'] = { ...data.overview };
      questions['START'].locked = true;
      questions['START'].type = 'start';
      questions['START'].next =
        data.start ||
        (data.questions && data.questions.length > 0 && data.questions[0].id)
          ? data.questions[0].id
          : false;
      questions['START'].number = index;
      questions['START'].id = 'START';
    }
    if (data && data.questions && Array.isArray(data.questions)) {
      data.questions.forEach((i) => {
        questions[i.id] = { ...i };
        index++;
        questions[i.id].number = index;
      });
    }

    // Ensure correct number is shown in module side panel after a restructure
    if (
      this.selectedQuestionId &&
      questions[this.selectedQuestionId] &&
      questions[this.selectedQuestionId].number !== this.selectedQuestionNumber
    ) {
      let self = this;
      setTimeout(function() {
        if (
          self.selectedQuestionId &&
          questions[self.selectedQuestionId] &&
          questions[self.selectedQuestionId].number !==
            self.selectedQuestionNumber
        ) {
          store.dispatch(
            uiSelectQuestion(
              self.selectedQuestionId,
              questions[self.selectedQuestionId].number
            )
          );
        }
      }, 500);
    }
    return this._addSoftThreads(questions);
  }

  _addSoftThreads(questions) {
    let addibles = {};
    for (let q in questions) {
      // Check next
      if (!questions[q].thread && !questions[q].next) {
        // If not an options-only module
        if (!isDirectionalOptionsType(questions[q].type)) {
          addibles[`${q}_LINKED_ADD_BUTTON`] = {
            id: `${q}_LINKED_ADD_BUTTON`,
            special: 'ADD',
            target: q,
          };
          questions[q].thread = `${q}_LINKED_ADD_BUTTON`;
        }
      } else if (questions[q].next && questions[q].next === 'END') {
        addibles[`${q}_LINKED_END`] = {
          id: `${q}_LINKED_END`,
          special: 'END',
        };
        questions[q].thread = `${q}_LINKED_END`;
      }
      // Check options
      if (
        questions[q].options &&
        Array.isArray(questions[q].options) &&
        questions[q].options
          .map((o) => o.goto && o.goto === JOURNEY_END)
          .filter((i) => i).length > 0
      ) {
        addibles[`${q}_LINKED_END`] = {
          id: `${q}_LINKED_END`,
          special: 'END',
        };
        questions[q].thread = `${q}_LINKED_END`;
      }
    }
    return { ...questions, ...addibles };
  }

  _findNotPlaced() {
    let notPlaced = [];
    for (let i in this.questions) {
      if (this.questions[i]) {
        if (!this.placed[i]) {
          notPlaced.push(i);
        }
      }
    }
    return notPlaced;
  }

  _findOrphanRoots(notPlaced = []) {
    let nodes = {};
    notPlaced.forEach((i) => (nodes[i] = 0));
    notPlaced.forEach((i) => {
      if (this.questions[i]) {
        // Check next
        if (
          this.questions[i].next &&
          notPlaced.indexOf(this.questions[i].next) > -1
        ) {
          nodes[this.questions[i].next]++;
        }

        // Check thread
        if (
          this.questions[i].thread &&
          notPlaced.indexOf(this.questions[i].thread) > -1
        ) {
          nodes[this.questions[i].thread]++;
        }

        // Check skip
        if (
          this.questions[i].optional &&
          this.questions[i].optional.goto &&
          notPlaced.indexOf(this.questions[i].optional.goto) > -1
        ) {
          nodes[this.questions[i].optional.goto]++;
        }

        // Has options
        if (this.questions[i].options && this.questions[i].options.length > 0) {
          for (var j in this.questions[i].options) {
            if (
              this.questions[i].options[j] &&
              this.questions[i].options[j].goto &&
              notPlaced.indexOf(this.questions[i].options[j].goto) > -1
            ) {
              nodes[this.questions[i].options[j].goto]++;
            }
          }
        }
      }
    });

    let roots = [];
    for (let i in nodes) {
      if (nodes[i] === 0) {
        roots.push(i);
      }
    }

    return roots;
  }

  _questionsToGrid() {
    this._questionToGrid('BEGIN', 0);
    this._findOrphanRoots(this._findNotPlaced()).forEach((orphanRoot) =>
      this._questionToGrid(orphanRoot, 1)
    );
    while (this._findNotPlaced().length > 0) {
      this._questionToGrid(this._findNotPlaced()[0], 1);
    }
  }

  _questionToGrid(id, column) {
    if (this.grid.length <= column) {
      this.grid = [...this.grid, {}];
    }

    if (this.placed[id]) {
      if (
        this._isCircularReference(id) ||
        this.questions[id].gridCol >= column
      ) {
        return;
      } else {
        let oldCol = this.questions[id].gridCol;
        delete this.grid[oldCol][id];
      }
    }

    if (this.questions[id]) {
      this.placed[id] = true;
      this.questions[id].gridCol = column;
      this.grid[column][id] = true;

      // Set grid height
      let c = 0;
      /* eslint-disable guard-for-in, no-unused-vars */
      for (let i in this.grid[column]) {
        c++;
      }
      /* eslint-enable guard-for-in, no-unused-vars */
      if (c > this.gridHeight) {
        this.gridHeight = c;
      }

      // Has soft-link-thread
      if (this.questions[id].thread) {
        this._questionToGrid(this.questions[id].thread, column + 1);
      }
      // Has next
      if (this.questions[id].next) {
        this._questionToGrid(this.questions[id].next, column + 1);
      }
      // Has skip
      if (this.questions[id].optional && this.questions[id].optional.goto) {
        this._questionToGrid(this.questions[id].optional.goto, column + 1);
      }
      // Has options
      if (this.questions[id].options && this.questions[id].options.length > 0) {
        for (var i in this.questions[id].options) {
          if (
            this.questions[id].options[i] &&
            this.questions[id].options[i].goto
          ) {
            this._questionToGrid(
              this.questions[id].options[i].goto,
              column + 1
            );
          }
        }
      }
    }
  }

  _isCircularReference(id) {
    return this._checkCircularReference(id, {}, id);
  }

  _checkCircularReference(search, seen, id) {
    let question = this.questions[id];

    let nextSeen = { ...seen };

    let nodes = {};

    if (this.questions[id]) {
      // Is in next
      if (question.next) {
        nodes[question.next] = true;
        nextSeen[question.next] = true;
        if (question.next === search) {
          return true;
        }
      }
      // Is in skip
      if (question.optional && question.optional.goto) {
        nodes[question.optional.goto] = true;
        nextSeen[question.optional.goto] = true;
        if (question.optional.goto === search) {
          return true;
        }
      }
      // Is in options
      if (question.options && question.options.length > 0) {
        for (var i in question.options) {
          if (question.options[i] && question.options[i].goto) {
            nodes[question.options[i].goto] = true;
            nextSeen[question.options[i].goto] = true;
            if (question.options[i].goto === search) {
              return true;
            }
          }
        }
      }

      for (let i in nodes) {
        if (!seen[i]) {
          let result = this._checkCircularReference(search, nextSeen, i);
          if (result === true) {
            return true;
          }
        }
      }
    }

    return false;
  }

  _stateChanged(state) {
    this.journey = state.journey;
    this.selectedQuestionId = state.journeyUi.question.selected;
    this.selectedQuestionNumber = state.journeyUi.question.number;
    this.sidePanelOpen = state.journeyUi.sidePanel.open;
    this._updateJourney();
  }
}

window.customElements.define('mad-editor', MadEditor);
