const stylish = (data, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    if (currentValue === null || currentValue === undefined) {
      return currentValue;
    }
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (Array.isArray(currentValue)) {
      const lines = currentValue.map((obj) => iter(obj, depth));
      return ['{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');
    }
    if (Object.keys(currentValue).includes('name')) {
      let lines;
      if (currentValue.change === 'add') {
        lines = `${currentIndent}+ ${currentValue.name}: ${iter(currentValue.value, depth + 2)}`;
      } else if (currentValue.change === 'remove') {
        lines = `${currentIndent}- ${currentValue.name}: ${iter(currentValue.value, depth + 2)}`;
      } else if (currentValue.change === 'upgrade') {
        lines = `${currentIndent}- ${currentValue.name}: ${iter(currentValue.value.oldProperty, depth + 2)}\n${currentIndent}+ ${currentValue.name}: ${iter(currentValue.value.newProperty, depth)}`;
      } else {
        lines = `${currentIndent}${currentValue.change} ${currentValue.name}: ${iter(currentValue.value, depth + 2)}`;
      }
      return [
        lines,
      ].join('');
    }
    const change = '  ';
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${change}${key}: ${iter(val, depth + 2)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
