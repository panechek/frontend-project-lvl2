import stylish from './stylish.js';
import plain from './plain.js';

const formatters = (data, formatName) => {
  let form;
  if (formatName === 'stylish') {
    form = stylish;
  } else if (formatName === 'plain') {
    form = plain;
  } else {
    throw Error(`Unknown format name: ${formatName}`);
  }
  return form(data);
};

export default formatters;
