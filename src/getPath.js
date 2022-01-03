import * as path from 'path';

const getpath = (filepath1) => path.resolve(process.cwd(), filepath1);

export default getpath;
