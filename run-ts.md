# Run TypeScript File

We have several option to run TypeScript on Node.js.

From output file perspective, we have:
-  Output JavaScript file from TypeScript to `dist` folder, then run it using `node`. It is preferably using this approach for production.
-  Run TypeScript without generating output file. It is preferably using this approach for development.


From library perspective, we also have some option:
-  using `tsc`
-  using `ts-node`
-  using `babel`
-  using `babel-node`

## Using `tsc` CLI
[`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) CLI compile the closest project defined by a `tsconfig.json`. This is one of the most basic way to transpile and run TypeScript code.
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
[`ts-node`](https://github.com/TypeStrong/ts-node) is a TypeScript execution and REPL for node.js. It support source map and native ESM support. With `ts-node`, we can directly run a TypeScript file without outputting the compiled file into the `dist` folder first.
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

When we run this command, there is no `.js` file created in `dist` folder.

## Using `babel`
You may be want to use [`babel`](https://babeljs.io/) for transpiling and only use `tsc` for type checking.
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
We already have `tsconfig.json`. For this babel option, we will add additional configuration
```json
{
  "compilerOptions": {
    ...
    // Don't emit; allow Babel to transform files.
    "noEmit": true,
    ...
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

## Using `babel-node`
We already setup TypeScript using `babel`. How about we don't want to output the `.js` file into `dist`, for example for development purpose? We can use [`babel-node`](https://babeljs.io/docs/en/babel-node).

### Setup
Assume we already follow step using `babel` above. We then only need to install this.
```bash
yarn add --dev @babel/node
```

### Running
When we run this, it is not emit file `.js` into `dist` folder.
```bash
npx babel-node src/helloWithType.ts -x ".ts"

> Hello Harum with types
```