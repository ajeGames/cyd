const log = (...args) => {
  console.log(...args);
};

const timestamp = () => {
  return new Date().toISOString();
};

exports.info = (...args) => {
  log(timestamp(), '[info]', ...args);
};

exports.error = (...args) => {
  log(timestamp(), '[error]', ...args);
};
