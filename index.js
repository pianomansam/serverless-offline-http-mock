'use strict';
const path = require("path");

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = (serverless.service.custom || {})["appsync-offline-http-mock"];

    this.hooks = {
      "before:offline:start:init": this.startHandler.bind(this),
      "before:appsync-offline:start:startHandler": this.startHandler.bind(this),
    };
  }

  async startHandler() {
    this.options.mocks.forEach(mock => {
      this.serverless.cli.log(`Loading HTTP mocks in ${mock}`);
      require(path.join(this.serverless.config.servicePath, this.options.directory, mock));
    });
  }

}

module.exports = ServerlessPlugin;
