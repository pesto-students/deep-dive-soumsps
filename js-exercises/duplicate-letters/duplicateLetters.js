function duplicateLetters(...args) {
  const string = args[0];

  if (typeof string !== 'string') {
    throw new Error(`Expected a string input, but received ${typeof string}`);
  }

  const characterFrequencyMap = new Map();
  let maxCount = 1;

  for (const character of string) {
    let characterFrequency = characterFrequencyMap.get(character);

    if (!characterFrequency) {
      characterFrequencyMap.set(character, 1);
    } else {
      characterFrequency += 1;
      characterFrequencyMap.set(character, characterFrequency);
    }

    if (maxCount < characterFrequency) {
      maxCount = characterFrequency;
    }
  }

  return maxCount > 1 ? maxCount : false;
}

export { duplicateLetters };
