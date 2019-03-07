// Side panel
export const UI_SIDE_PANEL_OPEN = 'UI_SIDE_PANEL_OPEN';
export const uiSidePanelOpen = () => ({ type: UI_SIDE_PANEL_OPEN });

export const UI_SIDE_PANEL_CLOSE = 'UI_SIDE_PANEL_CLOSE';
export const uiSidePanelClose = () => ({ type: UI_SIDE_PANEL_CLOSE });

// Module picker
export const UI_MODULE_PICKER_OPEN = 'UI_MODULE_PICKER_OPEN';
export const uiModulePickerOpen = () => ({ type: UI_MODULE_PICKER_OPEN });

export const UI_MODULE_PICKER_CLOSE = 'UI_MODULE_PICKER_CLOSE';
export const uiModulePickerClose = () => ({ type: UI_MODULE_PICKER_CLOSE });

export const UI_MODULE_PICKER_SELECT_MODULE = 'UI_MODULE_PICKER_SELECT_MODULE';
export const uiModulePickerSelectModule = (module) => ({
  type: UI_MODULE_PICKER_SELECT_MODULE,
  module,
});

export const UI_MODULE_PICKER_DESELECT_MODULE =
  'UI_MODULE_PICKER_DESELECT_MODULE';
export const uiModulePickerDeselectModule = () => ({
  type: UI_MODULE_PICKER_DESELECT_MODULE,
});

// Edit option dialog
export const UI_EDIT_OPTION_DIALOG_OPEN = 'UI_EDIT_OPTION_DIALOG_OPEN';
export const uiEditOptionDialogOpen = (selected) => ({
  type: UI_EDIT_OPTION_DIALOG_OPEN,
  selected,
});

export const UI_EDIT_OPTION_DIALOG_CLOSE = 'UI_EDIT_OPTION_DIALOG_CLOSE';
export const uiEditOptionDialogClose = () => ({
  type: UI_EDIT_OPTION_DIALOG_CLOSE,
});

// Edit documents dialog
export const UI_EDIT_DOCUMENT_DIALOG_OPEN = 'UI_EDIT_DOCUMENT_DIALOG_OPEN';
export const uiEditDocumentDialogOpen = (selected) => ({
  type: UI_EDIT_DOCUMENT_DIALOG_OPEN,
  selected,
});

export const UI_EDIT_DOCUMENT_DIALOG_CLOSE = 'UI_EDIT_DOCUMENT_DIALOG_CLOSE';
export const uiEditDocumentDialogClose = () => ({
  type: UI_EDIT_DOCUMENT_DIALOG_CLOSE,
});

// Edit steps dialog
export const UI_EDIT_STEP_DIALOG_OPEN = 'UI_EDIT_STEP_DIALOG_OPEN';
export const uiEditStepDialogOpen = (selected) => ({
  type: UI_EDIT_STEP_DIALOG_OPEN,
  selected,
});

export const UI_EDIT_STEP_DIALOG_CLOSE = 'UI_EDIT_STEP_DIALOG_CLOSE';
export const uiEditStepDialogClose = () => ({
  type: UI_EDIT_STEP_DIALOG_CLOSE,
});

// Delete dialog
export const UI_DELETE_DIALOG_OPEN = 'UI_DELETE_DIALOG_OPEN';
export const uiDeleteDialogOpen = () => ({ type: UI_DELETE_DIALOG_OPEN });

export const UI_DELETE_DIALOG_CLOSE = 'UI_DELETE_DIALOG_CLOSE';
export const uiDeleteDialogClose = () => ({ type: UI_DELETE_DIALOG_CLOSE });

export const UI_DELETE_DIALOG_SET_START = 'UI_DELETE_DIALOG_SET_START';
export const uiDeleteDialogSetStart = () => ({
  type: UI_DELETE_DIALOG_SET_START,
});

export const UI_DELETE_DIALOG_SET_AUTO_RESOLVE =
  'UI_DELETE_DIALOG_SET_AUTO_RESOLVE';
export const uiDeleteDialogSetAutoResolve = (id, resolver) => ({
  type: UI_DELETE_DIALOG_SET_AUTO_RESOLVE,
  id,
  resolver,
});

export const UI_DELETE_DIALOG_SET_MANUAL_RESOLVE =
  'UI_DELETE_DIALOG_SET_MANUAL_RESOLVE';
export const uiDeleteDialogSetManualResolve = (id, resolvers) => ({
  type: UI_DELETE_DIALOG_SET_MANUAL_RESOLVE,
  id,
  resolvers,
});

export const UI_DELETE_DIALOG_SET_RESOLVER = 'UI_DELETE_DIALOG_SET_RESOLVER';
export const uiDeleteDialogSetResolver = (resolver) => ({
  type: UI_DELETE_DIALOG_SET_RESOLVER,
  resolver,
});

// Editor
export const UI_SELECT_QUESTION = 'UI_SELECT_QUESTION';
export const uiSelectQuestion = (id, number) => ({
  type: UI_SELECT_QUESTION,
  id,
  number,
});

export const UI_DESELECT_QUESTION = 'UI_DESELECT_QUESTION';
export const uiDeselectQuestion = () => ({ type: UI_DESELECT_QUESTION });
