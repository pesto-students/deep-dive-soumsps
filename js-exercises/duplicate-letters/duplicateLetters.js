function duplicateLetters(str) {
  if (typeof str !== 'string') {
    throw new Error(`Expected a string input, but received ${typeof str}`);
  }

  const characterFrequencyMap = new Map();
  let maxDuplicateCount = 1;

  for (const character of str) {
    let characterFrequency = characterFrequencyMap.get(character);

    if (!characterFrequency) {
      characterFrequencyMap.set(character, 1);
    } else {
      characterFrequency += 1;
      characterFrequencyMap.set(character, characterFrequency);
    }

    if (maxDuplicateCount < characterFrequency) {
      maxDuplicateCount = characterFrequency;
    }
  }

  return maxDuplicateCount > 1 ? maxDuplicateCount : false;
}

export { duplicateLetters };
