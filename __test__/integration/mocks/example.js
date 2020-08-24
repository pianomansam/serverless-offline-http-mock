const mocks = (nock, hostname) => {
  nock(hostname)
    .persist()
    .get('/example')
    .reply(200, 'success!');
};

module.exports = mocks;
