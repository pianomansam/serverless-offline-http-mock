# serverless-offline-http-mock
![Travis CI Build Status](https://travis-ci.com/pianomansam/serverless-offline-http-mock.svg?branch=master "Travis CI Build Status")

## Overview

This is a plugin for the [serverless framework](https://www.npmjs.com/package/serverless) that provides the ability to create mock responses to HTTP(S) requests. This is useful when developing integration against an API spec that doesn't yet exist. This plugin uses [nock](https://www.npmjs.com/package/nock) to provide mock responses. It supports mock requests for:

- Local Invoke Lambda calls
- [Serverless Offline](https://www.npmjs.com/package/serverless-offline) API Gateway Lambda calls
- [Serverless Appsync Offline](https://www.npmjs.com/package/serverless-appsync-offline) data sources

## Requirements

A serverless framework project that uses [`useInProcess`](https://github.com/dherault/serverless-offline#useinprocess) to run Lambda handlers. 

**Running handlers in worker threads or Docker containers is not supported.**

In order to intercept HTTP calls when using `serverless-offline` worker threads or Docker containers, you must go the old-school route and manually return mock data in your code.

## Installation
```
npm install serverless-offline-http-mock
```
OR
```
yarn add serverless-offline-http-mock
```

## Upgrade to v1.0.0
Please note that if you installed a version of this prior to v1.0.0, you will need to follow step #2 below and add a truthy `serverless-offline-http-mock-enabled` value in order for your mocks to be loaded.

## Usage
1. Within the `serverless.yml` file, enable the plugin by placing an `serverless-offline-http-mock` entry in the plugins section.
**If using Serverless Offline, make sure it is placed above the `serverless-offline` plugin**

2. Create a `serverless-offline-http-mock-enabled` entry in the `custom` section with a truthy (true, 1, etc) or falsy value (false, 0, etc). You can also use environment variables (for example, `${env:MOCK_ENABLED}`).
3. Create a `serverless-offline-http-mock` entry in the `custom` section.
4. For each host, create an entry containing hostname, a list of JS files to load, and an optional directory. See `serverless.yml` example below.
5. In each JS file, export a function that accepts the nock library and hostname as arguments. Within that function, implement nock to handle the HTTP(S) requests. See `example.js` example below.


## Example

serverless.yml:
```yaml
...
custom:
  serverless-offline-http-mock-enabled: 1
  serverless-offline-http-mock:
    - hostname: http://www.example.com
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
    .reply(200, 'success!');
module.exports = mocks;
```

## Development
```
yarn test
```
