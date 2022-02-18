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
    // Target latest version of ECMAScript.
    "target": "ES2018",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "Node",
    // Handle DOM definition and console
    "lib": ["DOM"],
    // Import non-ES modules as default imports.
    "esModuleInterop": true,
    // Process & infer types from .js files.
    "allowJs": true,
    // Enable strictest settings like strictNullChecks & noImplicitAny.
    "strict": true,
  },
  "include": [ "src" ]
}
```

```bash
npx ts-node src/helloWithType.ts

> Hello Harum with types
```

## Using `babel`
### Install Babel
Assume that we already install `typescript`. For this setup we need to install these additional library.
```bash
yarn add --dev @babel/core @babel/cli @babel/preset-env @babel/preset-typescript
```

### Setup Babel Config
Then we need to create babel configuration. Create `babel.config.js` using this config.
```js
module.exports = {
  presets: [
    '@babel/preset-typescript', // Need this preset to process TypeScript
    '@babel/preset-env']
}
```

### Adjust TypeScript Configuration
We already have `tsconfig.json`. For this babel option, we will separate the TypeScript configuration for the clarity about the different in setting that need to be handled. Create `tsconfig.babel.json` with this value
```json
{
  "extends": "./configs/base",
  "compilerOptions": {
    // Don't emit; allow Babel to transform files.
    "noEmit": true,
  },
}
```

### Running
We can use `npx` when running the babel.
```bash
npx babel src --out-dir dist --extensions '.ts'

> Successfully compiled 2 files with Babel (137ms).
```

We also can add script in `package.json`
```json
"scripts": {
  "build:babel": "babel src --out-dir dist --extensions '.ts'"
},
```

And run this to trigger the transpilation
```bash
yarn build:babel
```

After the `.js` file is created, we can continue to run it using `node`.
```bash
node dist/helloWithType.js

> Hello Harum with types
```