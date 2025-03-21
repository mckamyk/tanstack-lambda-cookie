/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'lambda-cookie',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.TanstackStart('MyWeb', {
      domain: 'stream-test.mckamyk.io',
    })
  },
})
