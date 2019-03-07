import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { store } from '../../../redux/store';
import { selectPage } from '../../../redux/actions/application';
import {
  typeToDisplayName,
  isOptionsType,
  isKeyedOptionsType,
  isDirectionalOptionsType,
  JOURNEY_START,
  JOURNEY_END,
} from '../../../helpers/common';
import uuid from '../../../helpers/uuid';
import {
  uiModulePickerOpen,
  uiModulePickerClose,
  uiSidePanelClose,
  uiDeselectQuestion,
  uiSelectQuestion,
  uiModulePickerSelectModule,
  uiModulePickerDeselectModule,
  uiEditOptionDialogOpen,
  uiEditOptionDialogClose,
  uiDeleteDialogClose,
  uiDeleteDialogSetResolver,
  uiSidePanelOpen,
  uiEditDocumentDialogOpen,
  uiEditDocumentDialogClose,
  uiEditStepDialogOpen,
  uiEditStepDialogClose,
} from '../../../redux/actions/journeyUi';
import {
  deleteQuestionPreflight,
  deleteQuestion,
  setTitle,
  setQuestionType,
  removeQuestionNext,
  removeQuestionSkip,
  setQuestionTitle,
  setQuestionSubtitle,
  setQuestionKey,
  addQuestionOption,
  deleteQuestionOption,
  newQuestion,
  setQuestionOptionGoto,
  setQuestionOptionTitle,
  setQuestionOptionValue,
  addLinkToQuestionOption,
  addLinkToQuestionNext,
  addLinkToQuestionSkip,
  addQuestionDocument,
  deleteQuestionDocument,
  setQuestionDocumentValue,
  addQuestionStep,
  deleteQuestionStep,
  setQuestionStepValue,
} from '../../../redux/actions/journey';
import { connect } from 'pwa-helpers/connect-mixin';

import css from './style.pcss';
import template from './template.html';

import '../../objects/mad-editor';
import '../../objects/mad-main';
import '../../objects/mad-paper-asset-choice-wrapper';
import '../../assets/mad-asset-choice-agree';
import '../../assets/mad-asset-choice-calendar';
import '../../assets/mad-asset-choice-documents';
import '../../assets/mad-asset-choice-end';
import '../../assets/mad-asset-choice-location';
import '../../assets/mad-asset-choice-multiple';
import '../../assets/mad-asset-choice-multiple-text';
import '../../assets/mad-asset-choice-photos';
import '../../assets/mad-asset-choice-radio-buttons';
import '../../assets/mad-asset-choice-single';
import '../../assets/mad-asset-choice-text';
import '../../assets/mad-asset-choice-video';
import '../../lib/maki/maki-button';
import '../../lib/maki/maki-card';
import '../../lib/maki/maki-drop-down';
import '../../lib/maki/maki-input';
import '../../lib/maki/maki-shaded-paper';
import '../../lib/maki-icons/maki-icon-add';
import '../../lib/maki-icons/maki-icon-cross';
import '../../lib/maki-icons/maki-icon-edit';
import '../../lib/maki-icons/maki-icon-large-cross';
import '../../lib/maki-icons/maki-icon-play';

export default class MadScreenJourney extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      infoOpen: {
        type: Boolean,
        value: false,
      },
      titleValue: {
        type: String,
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
    this.titleValue = this.journey.title;
  }

  _isStart(selectedQuestionId) {
    return selectedQuestionId && selectedQuestionId === JOURNEY_START;
  }
  _isNotStart(selectedQuestionId) {
    return !this._isStart(selectedQuestionId);
  }

  _itemNameWrap(item) {
    return item ? item : 'Naamloos item';
  }

  _getNeededDocuments(journey) {
    return journey &&
      journey.overview &&
      journey.overview.needed_documents &&
      Array.isArray(journey.overview.needed_documents)
      ? journey.overview.needed_documents
      : [];
  }
  _editDocument(index) {
    let open = !isNaN(index) ? index : 0;
    return () => {
      store.dispatch(uiEditDocumentDialogOpen(open));
    };
  }
  _addDocument(journey) {
    let next =
      journey &&
      journey.overview &&
      Array.isArray(journey.overview.needed_documents)
        ? journey.overview.needed_documents.length
        : 0;
    return () => {
      store.dispatch(addQuestionDocument());
      store.dispatch(uiEditDocumentDialogOpen(next));
    };
  }
  _closeEditDocumentDialog() {
    store.dispatch(uiEditDocumentDialogClose());
  }
  _deleteDocument(editDocumentDialog) {
    let open =
      editDocumentDialog && !isNaN(editDocumentDialog.selected)
        ? editDocumentDialog.selected
        : 0;
    return () => {
      store.dispatch(deleteQuestionDocument(open));
      store.dispatch(uiEditDocumentDialogClose());
    };
  }
  _changeDocumentValue(editDocumentDialog) {
    let open =
      editDocumentDialog && !isNaN(editDocumentDialog.selected)
        ? editDocumentDialog.selected
        : 0;
    return (value) => {
      store.dispatch(setQuestionDocumentValue(open, value));
    };
  }
  _getDocumentTitle(journey, editDocumentDialog) {
    let open =
      editDocumentDialog && !isNaN(editDocumentDialog.selected)
        ? editDocumentDialog.selected
        : 0;
    return journey &&
      journey.overview &&
      journey.overview.needed_documents &&
      Array.isArray(journey.overview.needed_documents) &&
      journey.overview.needed_documents.length > open
      ? journey.overview.needed_documents[open]
      : '';
  }

  _getSteps(journey) {
    return journey &&
      journey.overview &&
      journey.overview.steps &&
      Array.isArray(journey.overview.steps)
      ? journey.overview.steps
      : [];
  }
  _editStep(index) {
    let open = !isNaN(index) ? index : 0;
    return () => {
      store.dispatch(uiEditStepDialogOpen(open));
    };
  }
  _addStep(journey) {
    let next =
      journey && journey.overview && Array.isArray(journey.overview.steps)
        ? journey.overview.steps.length
        : 0;
    return () => {
      store.dispatch(addQuestionStep());
      store.dispatch(uiEditStepDialogOpen(next));
    };
  }
  _closeEditStepDialog() {
    store.dispatch(uiEditStepDialogClose());
  }
  _deleteStep(editStepDialog) {
    let open =
      editStepDialog && !isNaN(editStepDialog.selected)
        ? editStepDialog.selected
        : 0;
    return () => {
      store.dispatch(deleteQuestionStep(open));
      store.dispatch(uiEditStepDialogClose());
    };
  }
  _changeStepValue(editStepDialog) {
    let open =
      editStepDialog && !isNaN(editStepDialog.selected)
        ? editStepDialog.selected
        : 0;
    return (value) => {
      store.dispatch(setQuestionStepValue(open, value));
    };
  }
  _getStepTitle(journey, editStepDialog) {
    let open =
      editStepDialog && !isNaN(editStepDialog.selected)
        ? editStepDialog.selected
        : 0;
    return journey &&
      journey.overview &&
      journey.overview.steps &&
      Array.isArray(journey.overview.steps) &&
      journey.overview.steps.length > open
      ? journey.overview.steps[open]
      : '';
  }

  _setPagePlayback() {
    store.dispatch(selectPage('playback'));
  }

  _title(journey) {
    return journey.title ? journey.title : 'Naamloze klantvraag';
  }

  _subtitle(journey) {
    return journey && journey.overview && journey.overview.subtitle
      ? journey.overview.subtitle
      : 'Geen subtitel';
  }

  _backToJourneys() {
    store.dispatch(selectPage('journeys'));
  }

  _changeTitle(title) {
    let debounceTime = new Date().getTime();
    this.__titleDebounce = debounceTime;
    let text = title;
    let self = this;
    setTimeout(function() {
      if (self.__titleDebounce === debounceTime) {
        delete self.__titleDebounce;
        store.dispatch(setTitle(text));
      }
    }, 1000);
  }

  _changeModuleTitle(title) {
    let state = store.getState();
    if (
      state &&
      state.journeyUi &&
      state.journeyUi.question &&
      state.journeyUi.question.selected
    ) {
      if (state.journeyUi.question.selected === JOURNEY_START) {
        // Set journey title for tile JOURNEY_START
        let debounceTime = new Date().getTime();
        this.__titleDebounce = debounceTime;
        let text = title;
        let self = this;
        setTimeout(function() {
          if (self.__titleDebounce === debounceTime) {
            delete self.__titleDebounce;
            store.dispatch(setTitle(text));
          }
        }, 1000);
      } else {
        store.dispatch(
          setQuestionTitle(state.journeyUi.question.selected, title)
        );
      }
    }
  }

  _getModuleTitle(id, journey, placeholder) {
    if (id && id === JOURNEY_START) {
      return journey.title ? journey.title : placeholder || '';
    } else if (id && journey) {
      if (
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0
      ) {
        let titleFound;
        journey.questions.forEach((i) => {
          if (id === i.id) {
            titleFound = i.title;
          }
        });
        return titleFound || placeholder || '';
      }
    }
    return '';
  }

  _changeModuleSubtitle(subtitle) {
    let state = store.getState();
    if (
      state &&
      state.journeyUi &&
      state.journeyUi.question &&
      state.journeyUi.question.selected
    ) {
      store.dispatch(
        setQuestionSubtitle(state.journeyUi.question.selected, subtitle)
      );
    }
  }

  _getModuleSubtitle(selectedQuestionId, journey) {
    if (selectedQuestionId && selectedQuestionId === JOURNEY_START) {
      return journey && journey.overview && journey.overview.subtitle
        ? journey.overview.subtitle
        : '';
    } else if (selectedQuestionId && journey) {
      if (
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0
      ) {
        let subtitleFound;
        journey.questions.forEach((i) => {
          if (selectedQuestionId === i.id) {
            subtitleFound = i.subtitle;
          }
        });
        return subtitleFound;
      }
    }
  }

  _changeModuleKey(key) {
    let state = store.getState();
    if (
      state &&
      state.journeyUi &&
      state.journeyUi.question &&
      state.journeyUi.question.selected
    ) {
      store.dispatch(setQuestionKey(state.journeyUi.question.selected, key));
    }
  }

  _getModuleKey(selectedQuestionId, journey) {
    if (selectedQuestionId && selectedQuestionId === JOURNEY_START) {
      return 'START';
    } else if (selectedQuestionId && journey) {
      if (
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0
      ) {
        let keyFound;
        journey.questions.forEach((i) => {
          if (selectedQuestionId === i.id) {
            keyFound = i.key;
          }
        });
        return keyFound;
      }
    }
  }

  _changeOptionTitle(selectedQuestionId, editOptionDialog) {
    return (title) =>
      store.dispatch(
        setQuestionOptionTitle(
          selectedQuestionId,
          editOptionDialog.selected,
          title
        )
      );
  }

  _getOptionTitle(selectedQuestionId, journey, editOptionDialog) {
    if (
      journey &&
      editOptionDialog &&
      editOptionDialog.open &&
      !isNaN(editOptionDialog.selected) &&
      selectedQuestionId
    ) {
      let question = this._getJourneyQuestionById(selectedQuestionId, journey);
      let option = editOptionDialog.selected;
      if (
        question &&
        question.options &&
        Array.isArray(question.options) &&
        question.options.length > option
      ) {
        return question.options[option].title;
      }
    }
  }

  _changeOptionValue(selectedQuestionId, editOptionDialog) {
    return (value) =>
      store.dispatch(
        setQuestionOptionValue(
          selectedQuestionId,
          editOptionDialog.selected,
          value
        )
      );
  }

  _getOptionValue(selectedQuestionId, journey, editOptionDialog) {
    if (
      journey &&
      editOptionDialog &&
      editOptionDialog.open &&
      !isNaN(editOptionDialog.selected) &&
      selectedQuestionId
    ) {
      let question = this._getJourneyQuestionById(selectedQuestionId, journey);
      let option = editOptionDialog.selected;
      if (
        question &&
        question.options &&
        Array.isArray(question.options) &&
        question.options.length > option
      ) {
        return question.options[option].value;
      }
    }
  }

  _changeOptionGoto(selectedQuestionId, editOptionDialog) {
    return (gotoValue) =>
      store.dispatch(
        setQuestionOptionGoto(
          selectedQuestionId,
          editOptionDialog.selected,
          gotoValue
        )
      );
  }

  _getOptionGoto(selectedQuestionId, journey, editOptionDialog) {
    if (
      journey &&
      editOptionDialog &&
      editOptionDialog.open &&
      !isNaN(editOptionDialog.selected) &&
      selectedQuestionId
    ) {
      let question = this._getJourneyQuestionById(selectedQuestionId, journey);
      let option = editOptionDialog.selected;
      if (
        question &&
        question.options &&
        Array.isArray(question.options) &&
        question.options.length > option
      ) {
        return question.options[option].goto;
      }
    }
  }

  _getOptionValuePlaceholder(selectedQuestionId, journey, editOptionDialog) {
    let val = this._getOptionTitle(
      selectedQuestionId,
      journey,
      editOptionDialog
    );
    if (val) {
      return val;
    }
    return 'Naamloze optie';
  }

  _getShouldShowOptions(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return question && isOptionsType(question.type);
  }
  _getShouldShowRootKey(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return question && !isKeyedOptionsType(question.type);
  }
  _getShouldShowOptionsKey(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return question && isKeyedOptionsType(question.type);
  }

  _getOptions(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return question && question.options ? question.options : [];
  }

  _getJourneyQuestionById(id, journey) {
    if (id === JOURNEY_START) {
      return {
        type: JOURNEY_START,
        id: JOURNEY_START,
      };
    }
    if (
      id &&
      journey &&
      journey.questions &&
      Array.isArray(journey.questions)
    ) {
      return journey.questions.find((i) => i.id === id);
    }
  }

  _toggleInfoOpen() {
    this.infoOpen = !this.infoOpen;
  }

  _toggleModulesOpen() {
    if (this.modulePickerOpen) {
      store.dispatch(uiModulePickerClose());
    } else {
      store.dispatch(uiModulePickerOpen());
    }
  }

  _optionTitle(title) {
    return title || 'Naamloze optie';
  }

  _editOption(option) {
    return () => store.dispatch(uiEditOptionDialogOpen(option));
  }

  _addOption() {
    store.dispatch(addQuestionOption(this.selectedQuestionId));
    let question = this._getJourneyQuestionById(
      this.selectedQuestionId,
      this.journey
    );
    store.dispatch(uiEditOptionDialogOpen(question.options.length - 1));
  }

  _deleteOption(selectedQuestionId, editOptionDialog) {
    let id = selectedQuestionId;
    let index =
      editOptionDialog && !isNaN(editOptionDialog.selected)
        ? editOptionDialog.selected
        : -1;
    return () => {
      this._closeEditOptionsDialog();
      store.dispatch(deleteQuestionOption(id, index));
    };
  }

  _closeEditOptionsDialog() {
    store.dispatch(uiEditOptionDialogClose());
  }

  _closeDeleteDialog() {
    store.dispatch(uiDeleteDialogClose());
  }

  _deleteItem() {
    let id = this.deleteDialog.id;
    let resolver = this.deleteDialog.resolver;
    if (id) {
      this._closeDeleteDialog();
      this._closeSidePanel();
      store.dispatch(deleteQuestion(id, resolver));
    }
  }

  _dropDownQuestionItems(journey, selectedQuestionId, option) {
    let newQuestionOption = () => {
      let target = selectedQuestionId;
      let newId = uuid();
      store.dispatch(newQuestion(newId));
      store.dispatch(addLinkToQuestionOption(target, newId, option));
      store.dispatch(uiEditOptionDialogClose());
      store.dispatch(uiSelectQuestion(newId, '+'));
      store.dispatch(uiSidePanelOpen());
      store.dispatch(uiModulePickerOpen());
    };
    return [newQuestionOption, ...this._allQuestions(journey)];
  }
  _dropDownQuestionItemsNext(journey, selectedQuestionId) {
    let newQuestionNext = () => {
      let target = selectedQuestionId;
      let newId = uuid();
      store.dispatch(newQuestion(newId));
      store.dispatch(addLinkToQuestionNext(target, newId));
      store.dispatch(uiSelectQuestion(newId, '+'));
      store.dispatch(uiSidePanelOpen());
      store.dispatch(uiModulePickerOpen());
    };
    return [newQuestionNext, ...this._allQuestions(journey)];
  }
  _attachNext(selectedQuestionId) {
    return function(next) {
      store.dispatch(addLinkToQuestionNext(selectedQuestionId, next));
    };
  }
  _getNext(selectedQuestionId, journey) {
    if (selectedQuestionId && journey) {
      let question = this._getJourneyQuestionById(selectedQuestionId, journey);
      if (question && question.next) {
        return question.next;
      }
    }
  }
  _dropDownQuestionItemsSkip(journey, selectedQuestionId) {
    let newQuestionSkip = () => {
      let target = selectedQuestionId;
      let newId = uuid();
      store.dispatch(newQuestion(newId));
      store.dispatch(addLinkToQuestionSkip(target, newId));
      store.dispatch(uiSelectQuestion(newId, '+'));
      store.dispatch(uiSidePanelOpen());
      store.dispatch(uiModulePickerOpen());
    };
    let doRemoveQuestionSkip = () => {
      let target = selectedQuestionId;
      store.dispatch(removeQuestionSkip(target));
    };
    return [
      doRemoveQuestionSkip,
      newQuestionSkip,
      ...this._allQuestions(journey),
    ];
  }
  _attachSkip(selectedQuestionId) {
    return function(skip) {
      store.dispatch(addLinkToQuestionSkip(selectedQuestionId, skip));
    };
  }
  _getSkip(selectedQuestionId, journey) {
    if (selectedQuestionId && journey) {
      let question = this._getJourneyQuestionById(selectedQuestionId, journey);
      if (question && question.optional && question.optional.goto) {
        return question.optional.goto;
      }
    }
  }
  _dropDownQuestionNames(journey) {
    return ['Nieuwe vraag aanmaken...', ...this._allNames(journey)];
  }
  _dropDownQuestionNamesWithEmpty(journey) {
    return ['Niet overslaan', ...this._dropDownQuestionNames(journey)];
  }

  _allQuestions(journey) {
    return journey && journey.questions && journey.questions.length
      ? journey.questions.map((i) => i.id)
      : [];
  }

  _allNames(journey) {
    return this._resolverNames(this._allQuestions(journey), journey);
  }

  _resolverNames(items, journey) {
    return items &&
      Array.isArray(items) &&
      items.length > 0 &&
      journey &&
      journey.questions &&
      journey.questions.length
      ? items.map((i) => {
        let found;
        journey.questions.forEach((j) => {
          if (i === j.id) {
            found = j;
          }
        });
        let name = found && found.title ? found.title : 'Naamloze vraag';
        if (found && found.type) {
          name += ` (${typeToDisplayName(found.type)})`;
        }
        return name;
      })
      : [];
  }

  _setResolver(resolver) {
    store.dispatch(uiDeleteDialogSetResolver(resolver));
  }

  _modulePopUpStyle(open) {
    if (open) {
      return ' ModuleSelected';
    }
    return '';
  }

  _selectModule(e) {
    if (e.target) {
      let target = e.target.getAttribute('data-module-name');
      store.dispatch(uiModulePickerSelectModule(target));
    }
  }

  _backToModules() {
    store.dispatch(uiModulePickerDeselectModule());
  }

  _saveQuestionType() {
    if (this.selectedQuestionId && this.modulePickerSelected) {
      store.dispatch(
        setQuestionType(this.selectedQuestionId, this.modulePickerSelected)
      );
    }
    store.dispatch(uiModulePickerClose());
  }

  _getCurrentQuestionType(selectedQuestionId, journey) {
    if (selectedQuestionId && journey) {
      if (
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0
      ) {
        let typeFound;
        journey.questions.forEach((i) => {
          if (selectedQuestionId === i.id) {
            typeFound = i.type;
          }
        });
        let type = typeToDisplayName(typeFound);
        return type ? type : 'Kies een module...';
      }
    }
  }

  _ifAllowNext(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return (
      !this._isEnd(selectedQuestionId, journey) &&
      !isDirectionalOptionsType(question ? question.type : null)
    );
  }

  _ifAllowOptionsGoto(selectedQuestionId, journey) {
    let question = this._getJourneyQuestionById(selectedQuestionId, journey);
    return isDirectionalOptionsType(question ? question.type : null);
  }

  _isEnd(selectedQuestionId, journey) {
    if (selectedQuestionId && journey) {
      if (
        journey.questions &&
        Array.isArray(journey.questions) &&
        journey.questions.length > 0
      ) {
        let nextFound;
        journey.questions.forEach((i) => {
          if (selectedQuestionId === i.id) {
            nextFound = i.next;
          }
        });
        return nextFound === JOURNEY_END;
      }
    }
  }

  _deleteNextEnd() {
    if (this.selectedQuestionId) {
      store.dispatch(removeQuestionNext(this.selectedQuestionId));
    }
  }

  _requestDelete() {
    if (this.selectedQuestionId) {
      store.dispatch(deleteQuestionPreflight(this.selectedQuestionId));
    }
  }

  _titleSwitch(module) {
    let title = typeToDisplayName(module);
    return title ? title : `Onbekende module: ${module}`;
  }

  _descriptionSwitch(module) {
    switch (module) {
      case 'agree':
        return [
          'Met deze module kun je de gebruiker ergens akkoord mee laten gaan.',
        ];
      case 'calendar':
        return ['Met deze module kun je de gebruiker een datum laten kiezen.'];
      case 'documents':
        return [
          'Met deze module kun je de gebruiker documenten laten bijvoegen.',
          'Wil je de gebruiker foto\'s laten maken of afbeeldingen laten ' +
            'bijvoegen? Dan kun je gebruik maken van Fotos.',
        ];
      case JOURNEY_END:
        return [
          'Met deze module kun je de klantvraag beëindigen.',
          'De gebruiker krijgt een overzicht van de ingevulde gegevens en ' +
            'kan deze vervolgens versturen.',
          'Je kan een Einde klantvraag ook toevoegen via de plus-knoppen.',
        ];
      case 'location':
        return [
          'Met deze module kun je de gebruiker een locatie laten kiezen.',
        ];
      case 'multiple':
        return [
          'Met deze module kun je de gebruiker een set met aankruisvakjes ' +
            'tonen. De gebruiker kan meerdere opties selecteren.',
          'Wil je dat de gebruiker slechts één optie moet kunnen kiezen? Dan ' +
            'kun je gebruik maken van Keuze of Keuzerondjes.',
        ];
      case 'multipleText':
        return [
          'Met deze module kun je meerdere invulvelden aan de gebruiker tonen.',
          'Wil je de gebruiker slechts een veld laten invullen dan kun je ' +
            'gebruik maken van Tekstveld.',
        ];
      case 'photos':
        return [
          'Met deze module kun je de gebruiker foto\'s laten maken en ' +
            'bijvoegen.',
          'Wil je de gebruiker andere bestandsvormen laten bijvoegen? Dan ' +
            'kun je gebruik maken van Documenten.',
        ];
      case 'radioButtons':
        return [
          'Met deze module kun je de gebruiker een set met keuzerondjes ' +
            'tonen. De gebruiker kan slechts één optie kiezen.',
          'Wil je dat de gebruiker wél meer opties moet kunnen kiezen? Dan ' +
            'kun je gebruik maken van een Meerkeuze.',
        ];
      case 'single':
        return [
          'Met deze module kun je een keuze voorleggen aan de gebruiker. De ' +
            'gebruiker kan slechts één optie kiezen.',
          'Wil je dat de gebruiker wél meer opties moet kunnen kiezen? Dan ' +
            'kun je gebruik maken van een Meerkeuze.',
        ];
      case 'text':
        return [
          'Met deze module kun je een invulveld aan de gebruiker tonen.',
          'Wil je de gebruiker meerdere velden laten invullen dan kun je ' +
            'gebruik maken van Meerdere tekstvelden',
        ];
      case 'video':
        return [
          'Met deze module kun je een keuze met videobeelden voorleggen aan ' +
            'de gebruiker. De gebruiker kan slechts één optie kiezen.',
        ];
      default:
        return [
          `Onbekende module: ${module}`,
          'Probeer de pagina te herladen of neem contact op.',
        ];
    }
  }

  _selectMatches(module, item) {
    return module === item;
  }

  _selectNotMatches(module, item) {
    return module !== item;
  }

  _selectQuestionWithTarget(e) {
    if (e && e.target && e.target.dataTarget) {
      store.dispatch(uiSelectQuestion(e.target.dataTarget, ''));
    }
  }

  _closeSidePanel() {
    store.dispatch(uiSidePanelClose());
    store.dispatch(uiDeselectQuestion());
  }

  _stateChanged(state) {
    let oldTitle = this.journey ? this.journey.title : null;
    this.journey = state.journey;
    if (this.journey && this.journey.title !== oldTitle) {
      this.titleValue = this.journey.title;
    }

    this.modulePickerOpen = state.journeyUi.modulePicker.open;

    // Debounce
    if (state.journeyUi.modulePicker.selected) {
      this.modulePickerDebouncedSelected =
        state.journeyUi.modulePicker.selected;
    } else if (
      this.modulePickerSelected !== state.journeyUi.modulePicker.selected
    ) {
      let self = this;
      setTimeout(function() {
        if (!self.modulePickerSelected) {
          self.modulePickerDebouncedSelected = null;
        }
      }, 500);
    }

    this.modulePickerSelected = state.journeyUi.modulePicker.selected;
    this.sidePanelOpen = state.journeyUi.sidePanel.open;
    this.selectedQuestionId = state.journeyUi.question.selected;
    this.selectedQuestionNumber = state.journeyUi.question.number;
    this.deleteDialogOpen = state.journeyUi.deleteDialog.open;
    this.deleteDialog = state.journeyUi.deleteDialog;

    this.editOptionDialogOpen = state.journeyUi.editOptionDialog.open;
    this.editOptionDialog = state.journeyUi.editOptionDialog;

    this.editDocumentDialogOpen = state.journeyUi.editDocumentDialog.open;
    this.editDocumentDialog = state.journeyUi.editDocumentDialog;

    this.editStepDialogOpen = state.journeyUi.editStepDialog.open;
    this.editStepDialog = state.journeyUi.editStepDialog;
  }
}

window.customElements.define('mad-screen-journey', MadScreenJourney);
