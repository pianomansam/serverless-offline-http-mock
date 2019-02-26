'use strict';
const path = require('path');
const nock = require('nock');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = (serverless.service.custom || {})["serverless-offline-http-mock"];

    this.hooks = {
      "before:offline:start:init": this.startHandler.bind(this),
      "before:appsync-offline:start:startHandler": this.startHandler.bind(this),
    };
  }

  startHandler() {
    if (!this.options || !this.options.length) {
      return;
    }

    this.options.forEach(mock => {
      if (mock.mocks.length) {
        if (mock.endpoint === undefined) {
          throw new Error('Offline HTTP Mock: No endpoint defined');
        }
        if (mock.directory === undefined) {
          throw new Error('Offline HTTP Mock: No directory defined');
        }
      }

      mock.mocks.forEach(mockPath => {
        this.serverless.cli.log(`Loading HTTP mocks in ${mockPath}`);
        const fn = require(path.join(this.serverless.config.servicePath, mock.directory, mockPath));
        fn(nock, mock.endpoint);
      });
    });
  }

}

module.exports = ServerlessPlugin;
