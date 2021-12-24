import path from 'path';

const getpath = (filepath1) => {
    return path.resolve(process.cwd(), filepath1)
 
}
export default getpath;
