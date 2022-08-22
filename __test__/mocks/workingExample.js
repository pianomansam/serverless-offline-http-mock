const mocks = (nock, hostname) =>
  nock(hostname).persist().get('/').reply(200, []);

module.exports = mocks;
