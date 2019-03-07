const dag = (date, kort) => {
  let dagen = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
  ];
  if (kort) {
    dagen = dagen.map((i) => i.substring(0, 2));
  }
  return dagen[date.getDay()];
};

const maand = (date, kort) => {
  let maanden = [
    'januari',
    'februari',
    'maart',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ];
  if (kort) {
    maanden = maanden.map((i) => (i.length < 6 ? i : i.substring(0, 3)));
  }
  return maanden[(date.getMonth() - 1) % 12];
};

export const time = (date) => {
  let h = date.getHours();
  let m = date.getMinutes();
  return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
};

export const toDutchDate = (date, kort) => {
  if (date && typeof date.getMonth === 'function') {
    return `${dag(date, kort)} ${date.getDate()} ${maand(date, kort)}${
      kort
        ? date.getFullYear() === new Date().getFullYear()
          ? ''
          : ` ${date.getFullYear()}`
        : ` ${date.getFullYear()}`
    }`;
  }
  return '';
};

export const toDutchDateTime = (date, kort) => {
  if (date && typeof date.getMonth === 'function') {
    return `${toDutchDate(date, kort)} ${time(date)}`;
  }
  return '';
};
