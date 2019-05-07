# serverless-offline-http-mock
![Travis CI Build Status](https://travis-ci.com/pianomansam/serverless-offline-http-mock.svg?branch=master "Travis CI Build Status")


serverless.yml:
```yaml
...
custom:
  serverless-offline-http-mock:
    - hostname: https://example-1234567890.com
      directory: 'mocks' # Optional
      mocks:
        - example.js

plugins:
  - serverless-offline-http-mock # Note how this comes before serverless-offline
  - serverless-offline
```

mocks/example.js:
```javascript
const mocks = (nock, hostname) =>
  nock(hostname)
    .persist()
    .get('/')
    .reply(200, []);
module.exports = mocks;
```
