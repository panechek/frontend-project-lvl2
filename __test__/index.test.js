import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../src/index.js';
import compare from '../src/compare.js';
import getPath from '../src/getPath.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.yaml');

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

describe('compare data', () => {
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
    expect(compare(data1, data2)).toEqual([{ change: 'remove', name: 'follow', value: false }, { change: 'fix', name: 'host', value: 'hexlet.io' }, { change: 'remove', name: 'proxy', value: '123.234.53.22' }, { change: 'upgrade', name: 'timeout', value: { newProperty: 20, oldProperty: 50 } }, { change: 'add', name: 'verbose', value: true }]);
  });
});

describe('gendiff', () => {
  test('stylish type default', () => {
    const file3 = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
    expect(genDiff(file1, file2)).toEqual(file3);
  });

  test('stylish type default hexlet', () => {
    const file3 = getFixturePath('file3.json');
    const file4 = getFixturePath('file4.json');
    const file5 = fs.readFileSync(getFixturePath('resultHexlet.txt'), 'utf-8');
    expect(genDiff(file3, file4)).toEqual(file5);
  });

  test('stylish type', () => {
    const file3 = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
    expect(genDiff(file1, file2, 'stylish')).toEqual(file3);
  });

  test('plain type', () => {
    const file3 = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
    expect(genDiff(file1, file2, 'plain')).toEqual(file3);
  });

  test('json type', () => {
    const file3 = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');
    expect(genDiff(file1, file2, 'json')).toEqual(file3);
  });

  test('errow type', () => {
    expect(() => { genDiff(file1, file2, 'jkl'); }).toThrowError(new Error('Unknown format name: jkl'));
  });
});
