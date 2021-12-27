import path from 'path';
import process from 'process';

const getpath = (filepath1) => {
    return path.resolve(process.cwd(), filepath1)
 
}
export default getpath;
