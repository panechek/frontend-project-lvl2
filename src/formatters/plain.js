const plain = (data) => {
  const valueType = (val) => {
    if (val === null || val === undefined || typeof val === 'boolean' || typeof val === 'number') {
      return val;
    }
    if (typeof val !== 'object') {
      return `'${val.toString()}'`;
    }
    return '[complex value]';
  };
  const done = (currentValue, name) => {
    if (Object.keys(currentValue).includes('change')) {
      if (currentValue.change === 'remove') {
        const currentName = `${name}${currentValue.name}`;
        return `Property '${currentName}' was removed`;
      }
      if (currentValue.change === 'add') {
        const currentName = `${name}${currentValue.name}`;
        const value = valueType(currentValue.value);
        return `Property '${currentName}' was added with value: ${value}`;
      }
      if (currentValue.change === 'upgrade') {
        const value1 = valueType(currentValue.value.oldProperty);
        const value2 = valueType(currentValue.value.newProperty);
        const currentName = `${name}${currentValue.name}`;
        return `Property '${currentName}' was updated. From ${value1} to ${value2}`;
      }
      if (currentValue.change === 'fix') {
        const currentName = `${name}${currentValue.name}`;
        if (valueType(currentValue.value) === '[complex value]') {
          return done(currentValue.value, `${currentName}.`);
        }
        return [];
      }
    }
    return currentValue.map((obj) => done(obj, name));
  };
  const res = done(data, '');
  return res.flat(Infinity).join('\n');
};

export default plain;
