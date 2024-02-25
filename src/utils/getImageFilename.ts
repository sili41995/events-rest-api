const getImageFilename = (url: string): string => {
  const imagePath = url.split('/');
  const lasIndex = imagePath.length - 1;
  const [filename] = imagePath[lasIndex].split('.');

  return filename;
};

export default getImageFilename;
