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
    let str;
    let currentName = name;
    if (Object.keys(currentValue).includes('change')) {
      if (currentValue.change === 'remove') {
        currentName += currentValue.name;
        str = `Property '${currentName}' was removed`;
      } else if (currentValue.change === 'add') {
        currentName += currentValue.name;
        const value = valueType(currentValue.value);
        str = `Property '${currentName}' was added with value: ${value}`;
      } else if (currentValue.change === 'upgrade') {
        const value1 = valueType(currentValue.value.oldProperty);
        const value2 = valueType(currentValue.value.newProperty);
        currentName += currentValue.name;
        str = `Property '${currentName}' was updated. From ${value1} to ${value2}`;
      } else if (currentValue.change === 'fix') {
        currentName += currentValue.name;
        if (valueType(currentValue.value) === '[complex value]') {
          str = done(currentValue.value, `${currentName}.`);
        } else {
          str = [];
        }
      }
    } else if (Array.isArray(currentValue)) {
      str = currentValue.map((obj) => done(obj, currentName));
    }
    return str;
  };
  const res = done(data, '');
  return res.flat(Infinity).join('\n');
};

export default plain;
