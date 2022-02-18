# Run TypeScript File

We have several option to run TypeScript on Node.js.

From output file perspective, we have:
-  Output JavaScript file from TypeScript to `dist` folder, then run it using `node`
-  Run TypeScript without generating output file


From library perspective, we also have some option:
-  using `tsc` command line
-  using `ts-node`
-  using `babel`

## Using `tsc` command line
### Setup
```bash
yarn add typescript
```
### run
```bash
npx tsc src/helloWithType.ts
```

This comment will transpile `src/helloWithType.ts` into `helloWithType.js`. If we do not setup our `tsconfig.json` file, then the `.js` file will be created on the same folder as the `.ts` file.

After the `.js` file is created, we can continue to run it using `node`.
```bash
node src/helloWithType.js

> Hello Harum with types
```

## Using `ts-node`
## Using `babel`


