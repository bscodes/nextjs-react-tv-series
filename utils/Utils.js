const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export { generateKey, truncate };
