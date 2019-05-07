const path = require('path');
const nock = require('nock');

const validate = item => {
  if (item.mocks === undefined || !item.mocks.length) {
    throw new Error('Offline HTTP Mock: No mocks defined!');
  }

  if (item.hostname === undefined) {
    throw new Error('Offline HTTP Mock: No hostname defined!');
  }

  return true;
};

const start = ({ item, servicePath, filename }) => {
  const { hostname, directory = null } = item;

  const file = path.join(servicePath, directory, filename);
  // eslint-disable-next-line import/no-dynamic-require
  const fn = require(file);

  if (typeof fn !== 'function') {
    throw new Error(`Offline HTTP Mock: ${file} did not return a function!`);
  }
  return fn(nock, hostname);
};

module.exports = {
  validate,
  start,
};
