import _ from 'lodash';

const compare = (data1, data2) => {
  const keys = _.union(Object.keys(data1).sort(), Object.keys(data2).sort());
  keys.sort();
  const newObj = (key) => {
    let acc;
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        acc = { name: key, value: data1[key], change: 'fix' };
      } else if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        const children = compare(data1[key], data2[key]);
        acc = { name: key, value: children, change: 'fix' };
      } else {
        acc = [{ name: key, value: { oldProperty: data1[key], newProperty: data2[key] }, change: 'upgrade' }];
      }
    } else if (_.has(data1, key)) {
      acc = { name: key, value: data1[key], change: 'remove' };
    } else {
      acc = { name: key, value: data2[key], change: 'add' };
    }
    return acc;
  };
  const object = keys.flatMap((key) => newObj(key));
  return object;
};

export default compare;
