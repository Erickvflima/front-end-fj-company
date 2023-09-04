export const stringAvatar = (name) => {
  const nameWithoutNumbers = name.replace(/\d/g, '');
  const nameSplited = nameWithoutNumbers.split(' ').filter((nameParams) => {
    return nameParams !== '';
  });

  if (nameWithoutNumbers.split(' ')[1]) {
    return `${nameSplited[0][0]}${
      nameSplited[nameSplited.length - 1][0] === ''
        ? nameSplited[nameSplited.length - 1][0]
        : nameSplited[nameSplited.length - 2][0]
    }`;
  }

  return nameSplited.length > 0
    ? `${nameSplited[0][0].toLocaleUpperCase()}`
    : 'N/A';
};
