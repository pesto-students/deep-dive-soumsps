function telephoneCheck(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    throw new Error(`Expected a string input, but received ${typeof phoneNumber}`);
  }

  const phoneNumberRegex = /^(\+?1\s?)?((\(\d{3})\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return phoneNumberRegex.test(phoneNumber);
}

export { telephoneCheck };
