# serverless-offline-http-mock
![Travis CI Build Status](https://travis-ci.com/pianomansam/serverless-offline-http-mock.svg?branch=master "Travis CI Build Status")

## Overview

This is a plugin for the [serverless framework](https://www.npmjs.com/package/serverless) that provides the ability to create mock responses to HTTP(S) requests. This is useful when developing integration against an API spec that doesn't yet exist. This plugin uses [nock](https://www.npmjs.com/package/nock) to provide mock responses. It supports mock requests for:

- Local Invoke Lambda calls
- [Serverless Offline](https://www.npmjs.com/package/serverless-offline) API Gateway Lambda calls
- [Serverless Appsync Offline](https://www.npmjs.com/package/serverless-appsync-offline) data sources

## Requirements

An existing serverless framework project.

## Installation
```
npm install serverless-offline-http-mock 
```
OR
```
yarn add serverless-offline-http-mock
```

## Usage
1. Within the `serverless.yml` file, enable the plugin by placing an `serverless-offline-http-mock` entry in the plugins section. 
**If using Serverless Offline, make sure it is placed above the `serverless-offline` plugin**

2. Create a `serverless-offline-http-mock` entry in the `custom` section.
3. For each host, create an entry containing hostname, a list of JS files to load, and an optional directory. See `serverless.yml` example below.
4. In each JS file, export a function that accepts the nock library and hostname as arguments. Within that function, implement nock to handle the HTTP(S) requests. See `example.js` example below.


## Example

serverless.yml:
```yaml
...
custom:
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