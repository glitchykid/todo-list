export const sort = (a: any, b: any): number => {
  if (a < b) return -1;
  else if (a > b) return 1;
  return 0;
};
