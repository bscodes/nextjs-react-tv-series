const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const getIsoDate = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  function addZero(n) {
    return n < 10 ? '0' + n : '' + n;
  }
  return year + '-' + addZero(month) + '-' + addZero(day);
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { generateKey, truncate, getIsoDate, getRandomNumber };
