export const QUESTION_TYPE_AGREE = 'agree';
export const QUESTION_TYPE_CALENDAR = 'calendar';
export const QUESTION_TYPE_DOCUMENTS = 'documents';
export const QUESTION_TYPE_END = 'end';
export const QUESTION_TYPE_LOCATION = 'location';
export const QUESTION_TYPE_MULTIPLE = 'multiple';
export const QUESTION_TYPE_MULTIPLE_TEXT = 'multipleText';
export const QUESTION_TYPE_PHOTOS = 'photos';
export const QUESTION_TYPE_RADIO_BUTTONS = 'radioButtons';
export const QUESTION_TYPE_SINGLE = 'single';
export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_VIDEO = 'video';

export const JOURNEY_START = 'START';
export const JOURNEY_END = 'END';

export const typeToDisplayName = (type) => {
  switch (type) {
    case QUESTION_TYPE_AGREE:
      return 'Accepteren';
    case QUESTION_TYPE_CALENDAR:
      return 'Datumkiezer';
    case QUESTION_TYPE_DOCUMENTS:
      return 'Documenten';
    case QUESTION_TYPE_END:
      return 'Einde klantvraag';
    case QUESTION_TYPE_LOCATION:
      return 'Locatie';
    case QUESTION_TYPE_MULTIPLE:
      return 'Meerkeuze';
    case QUESTION_TYPE_MULTIPLE_TEXT:
      return 'Meerdere tekstvelden';
    case QUESTION_TYPE_PHOTOS:
      return 'Fotos';
    case QUESTION_TYPE_RADIO_BUTTONS:
      return 'Keuzerondjes';
    case QUESTION_TYPE_SINGLE:
      return 'Keuze';
    case QUESTION_TYPE_TEXT:
      return 'Tekstveld';
    case QUESTION_TYPE_VIDEO:
      return 'Videokeuze';
    default:
      return type;
  }
};

export const isOptionsType = (type) =>
  isDirectionalOptionsType(type) || isNextableOptionsType(type);

export const isDirectionalOptionsType = (type) => {
  if (type === QUESTION_TYPE_RADIO_BUTTONS) return true;
  if (type === QUESTION_TYPE_SINGLE) return true;
  if (type === QUESTION_TYPE_VIDEO) return true;
  return false;
};

export const isNextableOptionsType = (type) => {
  if (type === QUESTION_TYPE_MULTIPLE) return true;
  if (type === QUESTION_TYPE_MULTIPLE_TEXT) return true;
  if (isKeyedOptionsType(type)) return true;
  return false;
};

export const isKeyedOptionsType = (type) => {
  if (type === QUESTION_TYPE_MULTIPLE_TEXT) return true;
  return false;
};
