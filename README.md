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
