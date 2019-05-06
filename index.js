const path = require('path');
const nock = require('nock');

class ServerlessPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.options = (serverless.service.custom || {})[
      'serverless-offline-http-mock'
    ];

    this.hooks = {
      'before:offline:start:init': this.startHandler.bind(this),
      'before:appsync-offline:start:startHandler': this.startHandler.bind(this),
    };
  }

  startHandler() {
    if (this.options === undefined || !this.options || !this.options.length) {
      return;
    }

    this.options.forEach(option => {
      if (option.mocks.length) {
        if (option.hostname === undefined) {
          throw new Error('Offline HTTP Mock: No hostname defined');
        }
      }

      option.mocks.forEach(mockPath => {
        this.serverless.cli.log(`Loading HTTP mocks in ${mockPath}`);
        const file = path.join(
          this.serverless.config.servicePath,
          option.directory,
          mockPath,
        );
        // eslint-disable-next-line import/no-dynamic-require
        const fn = require(file);
        fn(nock, option.hostname);
      });
    });
  }
}

module.exports = ServerlessPlugin;
