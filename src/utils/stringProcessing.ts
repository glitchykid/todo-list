export const validateNoSpaces = (str: string): number => {
  let result: number = 0;
  if (str.search(/[\s]/g) !== -1) result = -1;
  return result;
};

export const validateOnlyNumbers = (str: string): number => {
  let result: number = 0;
  if (str.search(/[\D+]/g) !== -1) result = -1;
  return result;
};

export const removeSpaces = (str: string): string => {
  const result: string = str.replace(/[\s]/g, "");
  return result;
};

export const removeAllExceptNumbers = (str: string): string => {
  const result = str.replace(/[\D+]/g, "");
  return result;
};
