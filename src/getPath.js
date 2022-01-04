import * as path from 'path';
import { fileURLToPath } from 'url';

const getPath = (filename) => {
    if (path.isAbsolute(filename)){
        return filename;
    };
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const getFixturePath = () => path.join(__dirname, '..', '__fixtures__', filename);
    const pathName = getFixturePath()
    return pathName;
}

export default getPath;
