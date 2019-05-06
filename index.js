const mock = require('./mock');

class ServerlessPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.items = (serverless.service.custom || {})[
      'serverless-offline-http-mock'
    ];

    this.hooks = {
      'before:offline:start:init': this.startHandler.bind(this),
      'before:appsync-offline:start:startHandler': this.startHandler.bind(this),
    };
  }

  startHandler() {
    if (this.items === undefined || !this.items || !this.items.length) {
      return;
    }

    this.items.forEach(item => {
      mock.validate(item);

      // if (!item.mocks.length) {
      //   throw new Error('Offline HTTP Mock: No mocks defined!');
      // }

      // if (item.hostname === undefined) {
      //   throw new Error('Offline HTTP Mock: No hostname defined!');
      // }

      const { servicePath } = this.serverless.config;
      const { log } = this.serverless.cli;

      item.mocks.forEach(filename => {
        // this.serverless.cli.log(`Loading HTTP mocks in ${mockPath}`);
        // const file = path.join(
        //   this.serverless.config.servicePath,
        //   option.directory,
        //   mockPath,
        // );
        // // eslint-disable-next-line import/no-dynamic-require
        // const fn = require(file);
        // fn(nock, option.hostname);

        mock.start({ mock, log, servicePath, filename });
      });
    });
  }
}

module.exports = ServerlessPlugin;
