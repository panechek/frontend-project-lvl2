import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = (data, formatName) => {
  let form;
  if (formatName === 'stylish') {
    form = stylish;
  } else if (formatName === 'plain') {
    form = plain;
  } else if (formatName === 'json') {
    form = json;
  } else {
    throw Error(`Unknown format name: ${formatName}`);
  }
  return form(data);
};

export default formatters;
