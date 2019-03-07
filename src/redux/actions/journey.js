export const SET_JOURNEY = 'SET_JOURNEY';
export const setJourney = (journey) => ({ type: SET_JOURNEY, journey });

export const ADD_QUESTION = 'ADD_QUESTION';
export const addQuestion = (question) => ({ type: ADD_QUESTION, question });
export const newQuestion = (id) => ({ type: ADD_QUESTION, question: { id } });

export const DELETE_QUESTION_PREFLIGHT = 'DELETE_QUESTION_PREFLIGHT';
export const deleteQuestionPreflight = (id) => ({
  type: DELETE_QUESTION_PREFLIGHT,
  id,
});

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const deleteQuestion = (id, resolver) => ({
  type: DELETE_QUESTION,
  id,
  resolver,
});

export const SET_TITLE = 'SET_TITLE';
export const setTitle = (title) => ({ type: SET_TITLE, title });

export const SET_QUESTION_TYPE = 'SET_QUESTION_TYPE';
export const setQuestionType = (id, type) => ({
  type: SET_QUESTION_TYPE,
  id,
  questionType: type,
});

export const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
export const setQuestionTitle = (id, title) => ({
  type: SET_QUESTION_TITLE,
  id,
  title,
});

export const SET_QUESTION_SUBTITLE = 'SET_QUESTION_SUBTITLE';
export const setQuestionSubtitle = (id, subtitle) => ({
  type: SET_QUESTION_SUBTITLE,
  id,
  subtitle,
});

export const SET_QUESTION_KEY = 'SET_QUESTION_KEY';
export const setQuestionKey = (id, key) => ({
  type: SET_QUESTION_KEY,
  id,
  key,
});

export const ADD_QUESTION_OPTION = 'ADD_QUESTION_OPTION';
export const addQuestionOption = (id) => ({
  type: ADD_QUESTION_OPTION,
  id,
});

export const DELETE_QUESTION_OPTION = 'DELETE_QUESTION_OPTION';
export const deleteQuestionOption = (id, index) => ({
  type: DELETE_QUESTION_OPTION,
  id,
  index,
});

export const SET_QUESTION_OPTION_GOTO = 'SET_QUESTION_OPTION_GOTO';
export const setQuestionOptionGoto = (id, index, gotoValue) => ({
  type: SET_QUESTION_OPTION_GOTO,
  id,
  index,
  gotoValue,
});

export const SET_QUESTION_OPTION_TITLE = 'SET_QUESTION_OPTION_TITLE';
export const setQuestionOptionTitle = (id, index, title) => ({
  type: SET_QUESTION_OPTION_TITLE,
  id,
  index,
  title,
});

export const SET_QUESTION_OPTION_VALUE = 'SET_QUESTION_OPTION_VALUE';
export const setQuestionOptionValue = (id, index, value) => ({
  type: SET_QUESTION_OPTION_VALUE,
  id,
  index,
  value,
});

// Documents
export const ADD_QUESTION_DOCUMENT = 'ADD_QUESTION_DOCUMENT';
export const addQuestionDocument = () => ({
  type: ADD_QUESTION_DOCUMENT,
});
export const DELETE_QUESTION_DOCUMENT = 'DELETE_QUESTION_DOCUMENT';
export const deleteQuestionDocument = (index) => ({
  type: DELETE_QUESTION_DOCUMENT,
  index,
});
export const SET_QUESTION_DOCUMENT_VALUE = 'SET_QUESTION_DOCUMENT_VALUE';
export const setQuestionDocumentValue = (index, value) => ({
  type: SET_QUESTION_DOCUMENT_VALUE,
  index,
  value,
});

// Steps
export const ADD_QUESTION_STEP = 'ADD_QUESTION_STEP';
export const addQuestionStep = () => ({
  type: ADD_QUESTION_STEP,
});
export const DELETE_QUESTION_STEP = 'DELETE_QUESTION_STEP';
export const deleteQuestionStep = (index) => ({
  type: DELETE_QUESTION_STEP,
  index,
});
export const SET_QUESTION_STEP_VALUE = 'SET_QUESTION_STEP_VALUE';
export const setQuestionStepValue = (index, value) => ({
  type: SET_QUESTION_STEP_VALUE,
  index,
  value,
});

export const ADD_LINK_TO_QUESTION_NEXT = 'ADD_LINK_TO_QUESTION_NEXT';
export const addLinkToQuestionNext = (id, link) => ({
  type: ADD_LINK_TO_QUESTION_NEXT,
  id,
  link,
});
export const removeQuestionNext = (id) => ({
  type: ADD_LINK_TO_QUESTION_NEXT,
  id,
  link: null,
});
export const addEndToQuestionNext = (id) => ({
  type: ADD_LINK_TO_QUESTION_NEXT,
  id,
  link: 'END',
});

export const ADD_LINK_TO_QUESTION_SKIP = 'ADD_LINK_TO_QUESTION_SKIP';
export const addLinkToQuestionSkip = (id, link) => ({
  type: ADD_LINK_TO_QUESTION_SKIP,
  id,
  link,
});
export const removeQuestionSkip = (id) => ({
  type: ADD_LINK_TO_QUESTION_SKIP,
  id,
  link: null,
});
export const addEndToQuestionSkip = (id) => ({
  type: ADD_LINK_TO_QUESTION_SKIP,
  id,
  link: 'END',
});

export const ADD_LINK_TO_QUESTION_OPTION = 'ADD_LINK_TO_QUESTION_OPTION';
export const addLinkToQuestionOption = (id, link, option) => ({
  type: ADD_LINK_TO_QUESTION_OPTION,
  id,
  link,
  option,
});
export const removeQuestionOption = (id, option) => ({
  type: ADD_LINK_TO_QUESTION_OPTION,
  id,
  link: null,
  option,
});
export const addEndToQuestionOption = (id, option) => ({
  type: ADD_LINK_TO_QUESTION_OPTION,
  id,
  link: 'END',
  option,
});
