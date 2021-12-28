import _ from 'lodash';

const compare = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  keys.sort();
  const newObj = (acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        const key1 = ['  ', key].join('');
        acc[key1] = data1[key];
        return acc;
      }
      const key1 = ['- ', key].join('');
      const key2 = ['+ ', key].join('');
      acc[key1] = data1[key];
      acc[key2] = data2[key];
      return acc;
    }
    if (_.has(data1, key)) {
      const key1 = ['- ', key].join('');
      acc[key1] = data1[key];
      return acc;
    }
    const key1 = ['- ', key].join('');
    acc[key1] = data2[key];
    return acc;
  };
  const object = keys.reduce(newObj, {});
  return object;
};

export default compare;
