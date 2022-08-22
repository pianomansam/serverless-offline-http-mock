/* eslint-disable no-console */
// eslint-disable-next-line prefer-destructuring
const spawnSync = require('child_process').spawnSync;
const path = require('path');

const integrationPath = path.resolve('./__test__/integration');

describe('test local invoke', () => {
  beforeAll(async () => {
    await spawnSync('yarn', [], {
      cwd: integrationPath,
      timeout: 30000,
    });
  });

  it('sls local invoke works', () => {
    console.log('Running sls invoke local');

    const result = spawnSync(
      'yarn',
      ['sls', 'invoke', 'local', '--function=example'],
      {
        cwd: integrationPath,
        timeout: 6000,
      },
    );

    console.log(result.stdout.toString());
    console.log(result.stderr.toString());

    expect(result.status).toEqual(0);
  });
});
