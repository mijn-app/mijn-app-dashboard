import {
  UI_SIDE_PANEL_OPEN,
  UI_SIDE_PANEL_CLOSE,
  UI_MODULE_PICKER_OPEN,
  UI_MODULE_PICKER_CLOSE,
  UI_MODULE_PICKER_SELECT_MODULE,
  UI_MODULE_PICKER_DESELECT_MODULE,
  UI_EDIT_OPTION_DIALOG_OPEN,
  UI_EDIT_OPTION_DIALOG_CLOSE,
  UI_DELETE_DIALOG_OPEN,
  UI_DELETE_DIALOG_CLOSE,
  UI_DELETE_DIALOG_SET_START,
  UI_DELETE_DIALOG_SET_AUTO_RESOLVE,
  UI_DELETE_DIALOG_SET_MANUAL_RESOLVE,
  UI_DELETE_DIALOG_SET_RESOLVER,
  UI_SELECT_QUESTION,
  UI_DESELECT_QUESTION,
  UI_EDIT_DOCUMENT_DIALOG_OPEN,
  UI_EDIT_DOCUMENT_DIALOG_CLOSE,
  UI_EDIT_STEP_DIALOG_OPEN,
  UI_EDIT_STEP_DIALOG_CLOSE,
} from '../actions/journeyUi';

export const journeyUi = (
  state = {
    sidePanel: sidePanel(),
    modulePicker: modulePicker(),
    editOptionDialog: editOptionDialog(),
    editDocumentDialog: editDocumentDialog(),
    editStepDialog: editStepDialog(),
    deleteDialog: deleteDialog(),
    question: question(),
  },
  action
) => {
  switch (action.type) {
    case UI_SIDE_PANEL_OPEN:
    case UI_SIDE_PANEL_CLOSE:
      return {
        ...state,
        sidePanel: sidePanel(state.sidePanel, action),
      };
    case UI_MODULE_PICKER_OPEN:
    case UI_MODULE_PICKER_CLOSE:
    case UI_MODULE_PICKER_SELECT_MODULE:
    case UI_MODULE_PICKER_DESELECT_MODULE:
      return {
        ...state,
        modulePicker: modulePicker(state.modulePicker, action),
      };
    case UI_EDIT_OPTION_DIALOG_OPEN:
    case UI_EDIT_OPTION_DIALOG_CLOSE:
      return {
        ...state,
        editOptionDialog: editOptionDialog(state.editOptionDialog, action),
      };
    case UI_EDIT_DOCUMENT_DIALOG_OPEN:
    case UI_EDIT_DOCUMENT_DIALOG_CLOSE:
      return {
        ...state,
        editDocumentDialog: editDocumentDialog(
          state.editDocumentDialog,
          action
        ),
      };
    case UI_EDIT_STEP_DIALOG_OPEN:
    case UI_EDIT_STEP_DIALOG_CLOSE:
      return {
        ...state,
        editStepDialog: editStepDialog(state.editStepDialog, action),
      };
    case UI_DELETE_DIALOG_OPEN:
    case UI_DELETE_DIALOG_CLOSE:
    case UI_DELETE_DIALOG_SET_START:
    case UI_DELETE_DIALOG_SET_AUTO_RESOLVE:
    case UI_DELETE_DIALOG_SET_MANUAL_RESOLVE:
    case UI_DELETE_DIALOG_SET_RESOLVER:
      return {
        ...state,
        deleteDialog: deleteDialog(state.deleteDialog, action),
      };
    case UI_SELECT_QUESTION:
    case UI_DESELECT_QUESTION:
      return {
        ...state,
        question: question(state.question, action),
      };
    default:
      return state;
  }
};

const sidePanel = (state = { open: false }, action) => {
  switch (action ? action.type : '') {
    case UI_SIDE_PANEL_OPEN:
      return {
        ...state,
        open: true,
      };
    case UI_SIDE_PANEL_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const modulePicker = (state = { open: false, selected: null }, action) => {
  switch (action ? action.type : '') {
    case UI_MODULE_PICKER_OPEN:
      return {
        ...state,
        open: true,
      };
    case UI_MODULE_PICKER_CLOSE:
      return {
        ...state,
        open: false,
        selected: null,
      };
    case UI_MODULE_PICKER_SELECT_MODULE:
      return {
        ...state,
        selected: action.module,
      };
    case UI_MODULE_PICKER_DESELECT_MODULE:
      return {
        ...state,
        selected: null,
      };
    default:
      return state;
  }
};

const editOptionDialog = (state = { open: false }, action) => {
  switch (action ? action.type : '') {
    case UI_EDIT_OPTION_DIALOG_OPEN:
      return {
        ...state,
        open: true,
        selected: action.selected,
      };
    case UI_EDIT_OPTION_DIALOG_CLOSE:
      return {
        ...state,
        open: false,
        selected: null,
      };
    default:
      return state;
  }
};

const editDocumentDialog = (state = { open: false }, action) => {
  switch (action ? action.type : '') {
    case UI_EDIT_DOCUMENT_DIALOG_OPEN:
      return {
        ...state,
        open: true,
        selected: action.selected,
      };
    case UI_EDIT_DOCUMENT_DIALOG_CLOSE:
      return {
        ...state,
        open: false,
        selected: null,
      };
    default:
      return state;
  }
};

const editStepDialog = (state = { open: false }, action) => {
  switch (action ? action.type : '') {
    case UI_EDIT_STEP_DIALOG_OPEN:
      return {
        ...state,
        open: true,
        selected: action.selected,
      };
    case UI_EDIT_STEP_DIALOG_CLOSE:
      return {
        ...state,
        open: false,
        selected: null,
      };
    default:
      return state;
  }
};

const deleteDialog = (
  state = {
    open: false,
    mode: null,
    id: null,
    resolver: null,
    resolvers: [],
  },
  action
) => {
  switch (action ? action.type : '') {
    case UI_DELETE_DIALOG_OPEN:
      return {
        ...state,
        open: true,
      };
    case UI_DELETE_DIALOG_CLOSE:
      return {
        ...state,
        open: false,
        mode: null,
        id: null,
        resolver: null,
        resolvers: [],
      };
    case UI_DELETE_DIALOG_SET_START:
      return {
        ...state,
        mode: 'START',
      };
    case UI_DELETE_DIALOG_SET_AUTO_RESOLVE:
      return {
        ...state,
        mode: 'AUTO',
        id: action.id,
        resolver: action.resolver,
      };
    case UI_DELETE_DIALOG_SET_MANUAL_RESOLVE:
      return {
        ...state,
        mode: 'MANUAL',
        id: action.id,
        resolver: action.resolvers[0],
        resolvers: action.resolvers,
      };
    case UI_DELETE_DIALOG_SET_RESOLVER:
      return {
        ...state,
        resolver: action.resolver,
      };
    default:
      return state;
  }
};

const question = (state = { selected: null, number: null }, action) => {
  switch (action ? action.type : '') {
    case UI_SELECT_QUESTION:
      return {
        ...state,
        selected: action.id,
        number: action.number || null,
      };
    case UI_DESELECT_QUESTION:
      return {
        ...state,
        selected: null,
        number: null,
      };
    default:
      return state;
  }
};
