#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
program
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format, [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });
program.parse();
