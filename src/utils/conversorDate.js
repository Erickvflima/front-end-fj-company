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

export const formateDateEn = (data) => {
  const year = data.getFullYear();
  const month = String(data.getMonth() + 1).padStart(2, '0'); // Os meses começam em 0 (janeiro)
  const day = String(data.getDate() + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
