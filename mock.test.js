const mock = require('./mock');

test('valid mock passes', () => {
  const validMock = {
    hostname: 'http://www.example.com',
    mocks: ['foo.js', 'bar.js'],
  };
  expect(mock.validate(validMock)).toBe(true);
});

test("mock with no hostname doesn't pass", () => {
  const invalidMock = {
    mocks: ['foo.js', 'bar.js'],
  };
  expect(() => mock.validate(invalidMock)).toThrowError('No hostname defined');
});

test("mock with no mocks doesn't pass", () => {
  const invalidMock = {
    hostname: 'http://www.example.com',
  };
  expect(() => mock.validate(invalidMock)).toThrowError('No mocks defined');
});

test("mock with empty mocks doesn't pass", () => {
  const invalidMock = {
    hostname: 'http://www.example.com',
    mocks: [],
  };
  expect(() => mock.validate(invalidMock)).toThrowError('No mocks defined');
});
