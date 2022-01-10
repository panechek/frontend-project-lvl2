import _ from 'lodash';

const compare = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(keys);
  const newObj = (key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return { name: key, value: data1[key], change: 'fix' };
      }
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        const children = compare(data1[key], data2[key]);
        return { name: key, value: children, change: 'fix' };
      }
      return [{ name: key, value: { oldProperty: data1[key], newProperty: data2[key] }, change: 'upgrade' }];
    }
    if (_.has(data1, key)) {
      return { name: key, value: data1[key], change: 'remove' };
    }
    return { name: key, value: data2[key], change: 'add' };
  };
  const object = sortKeys.flatMap((key) => newObj(key));
  return object;
};

export default compare;
