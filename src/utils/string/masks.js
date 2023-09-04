export const maskCpf = (value) => {
  let newValue = value;
  if (newValue) {
    newValue = newValue.replace(/\D/g, '');
    newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2');
    newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2');
    newValue = newValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return newValue;
  }
  return '';
};
