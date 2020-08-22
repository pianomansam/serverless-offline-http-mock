const mock = require('./mock');

class ServerlessPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.items = (serverless.service.custom || {})[
      'serverless-offline-http-mock'
    ];

    this.hooks = {
      'before:offline:start': this.startHandler.bind(this),
      'before:offline:start:init': this.startHandler.bind(this),
      'before:invoke:local:invoke': this.startHandler.bind(this),
      'before:appsync-offline:start:startHandler': this.startHandler.bind(this),
    };
  }

  startHandler() {
    if (this.items === undefined || !this.items || !this.items.length) {
      return;
    }

    this.items.forEach(item => {
      mock.validate(item);
      const { servicePath } = this.serverless.config;

      item.mocks.forEach(filename => {
        this.serverless.cli.log(`Loading HTTP mocks in ${filename}`);
        mock.start({ item, servicePath, filename });
      });
    });
  }
}

module.exports = ServerlessPlugin;
