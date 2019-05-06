# serverless-offline-http-mock


```yaml
serverless-offline-http-mock:
  - hostname: https://example.com
    directory: 'mocks' # Optional
    mocks:
      - gmail.js
      - maps.js
```

```javascript

nock(hostname)
  .persist()
  .post('/movetrac/lead')
  .reply(404, []);
module.exports = uflLeads;
```