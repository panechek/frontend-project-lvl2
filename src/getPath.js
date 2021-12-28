import path from 'path';
import process from 'process';

const getpath = (filepath1) => path.resolve(process.cwd(), filepath1);

export default getpath;
