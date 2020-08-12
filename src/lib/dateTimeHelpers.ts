export enum WeekDayEnum {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const getWeekDay = (date: Date): WeekDayEnum => {
  const day = date.getDay();

  return Object.values(WeekDayEnum)[day];
};

export const humanDuration = (duration: string): string => {
  const durationSplit = duration.split(':');

  if (durationSplit.length === 2) {
    const [min] = durationSplit;
    return `${Number(min)}min`;
  }

  const [hr, min] = durationSplit;

  if (hr === '00') {
    return `${Number(min)}min`;
  }

  return `${Number(hr)}Hrs. ${min}min`;
};
