# AWS Lambda Tanstack Start Set Cookie bug

This is a reproduction for cookies not being set in Tanstack Start on AWS Lambdas.

Note that this only occurs with the following set in app.config.ts

```ts
export default defineConfig({
  server: {
    preset: 'aws-lambda',
    awsLambda: {
      streaming: true,
    },
  },
})
```

## Testing steps

First you can fire it up in `bun dev` to see how it should behave normally.

To see how it runs on Lambda with streaming, you can visit [https://stream-test.mckamyk.io](https://stream-test.mckamyk.io) to see this code deployed.

You can see a non-streaming version deployed at [https://nostream-test.mckamyk.io](https://nostream-test.mckamyk.io)

If you want to deploy the non-streaming version,

```ts
export default defineConfig({
  server: {
    preset: 'aws-lambda',
    // awsLambda: {
    //   streaming: true,
    // },
  },
})
```

and redeploy. You may want to `bun sst deploy --stage non-streaming` to put it in a separate namespace. You can remove it by `bun sst remove --stage non-streaming`

## What to look out for.

When you click `Set the cookie` look for the POST in the network dev tools, you should see `"set-cookie: test=<current date>"`. While in dev mode, this works fine. When deployed, it does not.

Here's an image with the response headers from the POST when running locally
![](docs/local.png)

And here's one deployed with streaming enabled.
![](docs/deployed.png)

Same when you click `Remove Cookie`

## Deploying again

If you'd like to make change to see if the bug still exists, make sure your `aws-cli` is setup and connected to your aws account.

then run `bun sst deploy` to deploy it.

> NOTE: The first time you deploy can take ~15 minutes as it waits for a cloudfront url + cert to be generated
> Subsequent deploys are much faster as it only needs to update lambda code.

You can run `bun sst remove` to un-deploy it and tear down resources.
