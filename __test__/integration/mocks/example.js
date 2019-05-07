const mocks = (nock, hostname) => {
  nock(hostname)
    // eslint-disable-next-line no-console
    .log(console.log)
    .persist()
    .get('/example')
    .reply(200, 'success!');
};

module.exports = mocks;
