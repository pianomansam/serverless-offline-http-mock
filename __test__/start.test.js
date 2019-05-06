const path = require('path');
const mock = require('../mock');

test('valid mock loads', () => {
  const validMock = {
    hostname: 'http://www.example.com',
    mocks: ['foo.js', 'bar.js'],
    directory: 'mocks',
  };
  const log = () => {};
  const servicePath = path.resolve('./__test__');
  const filename = 'workingExample.js';

  expect(mock.start({ mock: validMock, log, servicePath, filename })).toEqual(
    expect.objectContaining({
      basePath: 'http://www.example.com:80',
    }),
  );
});

test('handle missing mock file', () => {
  const validMock = {
    hostname: 'http://www.example.com',
    mocks: ['foo.js', 'bar.js'],
    directory: 'mocks',
  };
  const log = () => {};
  const servicePath = path.resolve('./__test__');
  const filename = 'missingExample.js';

  expect(() =>
    mock.start({ mock: validMock, log, servicePath, filename }),
  ).toThrowError('Cannot find module');
});

test('handle bad mock file', () => {
  const validMock = {
    hostname: 'http://www.example.com',
    mocks: ['foo.js', 'bar.js'],
    directory: 'mocks',
  };
  const log = () => {};
  const servicePath = path.resolve('./__test__');
  const filename = 'badExample.js';

  expect(() =>
    mock.start({ mock: validMock, log, servicePath, filename }),
  ).toThrowError('did not return a function');
});
