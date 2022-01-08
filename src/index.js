import getPath from './getPath.js';
import compare from './compare.js';
import parsers from './parsers.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2, formater = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const data1 = parsers(path1);
  const data2 = parsers(path2);
  const output = compare(data1, data2);
  let answer;
  if (formater === 'stylish') {
    answer = stylish(output);
  } else {
    answer = 'Неизвестный формат';
  }
  return answer;
};

export default genDiff;
