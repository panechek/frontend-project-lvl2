import getPath from './getPath.js';
import compare from './compare.js';
import parsers from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const data1 = parsers(path1);
  const data2 = parsers(path2);
  const output = compare(data1, data2);
  return output;
};

export default genDiff;
