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
### Running
```bash
npx tsc src/helloWithType.ts --outDir dist
```

This comment will transpile `src/helloWithType.ts` into `helloWithType.js`. Because of we define the output directory to `dist` folder using `--outDir dist` option, then the `.js` file will be created on the `dist` folder.

After the `.js` file is created, we can continue to run it using `node`.
```bash
node dist/helloWithType.js

> Hello Harum with types
```

## Using `ts-node`
### Setup
We already install `typescript` above, so for this step, we only need to install `ts-node`
```bash
yarn add ts-node
```
### Running
Using `ts-node` is the most simple way to run TypeScript file.

At this moment, we still do not have `tsconfig.json` file. We will get the error below
```bash
npx ts-node src/helloWithType.ts

> return new TSError(diagnosticText, diagnosticCodes);
>            ^
> TSError: ⨯ Unable to compile TypeScript:
> src/helloWithType.ts:2:3 - error TS2584: Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

> 2   console.log(`Hello ${name} with types`)
```

To fix this, we need to configure our `tsconfig.json` andd `"DOM"` lib into the configuration. Here is some simple config for our `tsconfig.json`.

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": ["ESNext", "DOM"],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "experimentalDecorators": true
  },
  "exclude": ["node_modules", "dist"]
}

```

```bash
npx ts-node src/helloWithType.ts

> Hello Harum with types
```

## Using `babel`
