const tableNameValidator = (name: string): boolean | string => {
  const hasSpaces = /\s/.test(name);
  const hasNonAlphanumeric = /[^a-zA-Z]/.test(name);
  const startsWithUppercase = /^[A-Z]/.test(name);

  if (hasSpaces) return "Name shouldn't contain any space";
  if (hasNonAlphanumeric)
    return "Name should only contain letters and/or numbers";
  if (startsWithUppercase)
    return "Name shouldn't start with an uppercase letter";

  return true;
};

export { tableNameValidator };
