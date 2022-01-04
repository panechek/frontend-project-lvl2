import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../src';
import compare from '../src/compare.js';
import getPath from '../src/getPath.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('get path', () => {
  test('relative path', () => {
    const path1 = 'filepath1.json';
    expect(getPath(path1)).toEqual('/home/panechek/frontend-project-lvl2/__fixtures__/filepath1.json');
  });

  test('absolute path', () => {
    const path1 = '/home/panechek/frontend-project-lvl2/__fixtures__/filepath2.json';
    expect(getPath(path1)).toEqual('/home/panechek/frontend-project-lvl2/__fixtures__/filepath2.json');
  });
});

describe('get data', () => {
  const data = {
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  };
  test('parsers json', () => {
    expect(parsers('/home/panechek/frontend-project-lvl2/__fixtures__/filepath1.json')).toEqual(data);
  });

  test('parsers yml', () => {
    expect(parsers('/home/panechek/frontend-project-lvl2/__fixtures__/filepath1.yml')).toEqual(data);
  });

  test('parsers yaml', () => {
    expect(parsers('/home/panechek/frontend-project-lvl2/__fixtures__/filepath.yaml')).toEqual(data);
  });
});

test('compare data', () => {
  const data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const data2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  expect(compare(data1, data2)).toEqual({
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '- verbose': true,
  });
});

test('gendiff', () => {
  const file1 = getFixturePath('testfile1.json');
  const file2 = getFixturePath('testfile2.json');
  expect(genDiff(file1, file2)).toEqual({
    '- 1': 1,
    '+ 1': 0,
    '  2': 0,
  });
});
