function abbreviateString(str) {
  if (typeof str !== 'string') {
    throw new Error(`Expected a string, but received ${typeof str} type`);
  }

  const separatorRegex = /\s+/g;
  const words = str.trim().split(separatorRegex);
  const abbreviationFirstWord = words[0];
  const abbreviationLastWord = `${words[words.length - 1][0].toUpperCase()}.`;

  return `${abbreviationFirstWord} ${abbreviationLastWord}`;
}

export { abbreviateString };
