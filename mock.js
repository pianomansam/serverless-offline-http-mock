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

const start = ({ mock, log, servicePath, mockPath }) => {
  const { hostname, directory } = mock;

  log(`Loading HTTP mocks in ${mockPath}`);
  const file = path.join(servicePath, directory, mockPath);
  // eslint-disable-next-line import/no-dynamic-require
  const fn = require(file);
  fn(nock, hostname);
};

module.exports = {
  validate,
  start,
};
