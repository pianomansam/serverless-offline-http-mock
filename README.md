# serverless-offline-http-mock
![Travis CI Build Status](https://travis-ci.com/pianomansam/serverless-offline-http-mock.svg?branch=master "Travis CI Build Status")


```yaml
serverless-offline-http-mock:
  - hostname: https://example.com
    directory: 'mocks' # Optional
    mocks:
      - example.js
```

mocks/example.js:
```javascript
const mocks = (nock, hostname) => {
  nock(hostname)
    .persist()
    .get('/')
  .reply(200, []);
}
module.exports = mocks;
```
