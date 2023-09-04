export const maskDateTimeStamp = (date, dateFormat = 'pt-BR') => {
  try {
    const plusDay = new Date(date);
    plusDay.setDate(plusDay.getDate());
    const newDate = new Intl.DateTimeFormat(dateFormat, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(plusDay);
    return newDate;
  } catch (error) {
    return String(date);
  }
};
