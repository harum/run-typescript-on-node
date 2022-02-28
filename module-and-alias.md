# Handle Module and Alias

Assume we have this `tsconfig.json` value
```json
{
  "compilerOptions": {
    // Target latest version of ECMAScript.
    "target": "ES2018",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "Node",
    // Handle DOM definition and console
    "lib": ["ESNext", "ESNext.AsyncIterable", "DOM"],
    // Import non-ES modules as default imports.
    "esModuleInterop": true,
    // Process & infer types from .js files.
    "allowJs": true,
    // Enable strictest settings like strictNullChecks & noImplicitAny.
    "strict": true,
    "outDir": "./dist",
  },
  "include": [ "src" ]
}
```

## Handle Module
Let say we create new file to handle greeting text.
```ts
// src/greeting.ts
export default function greeting() {
  return 'Good morning'
}
```

And we use the `greeting` function inside our current file.
```ts
import greeting from "./greeting"

function helloWithType(name: string): void {
  console.log(`${greeting()}, ${name} with types`)
}

helloWithType('Harum')
```

We want to transpile it using configuration that already defined on `tsconfig.json`
```bash
npx tsc -p tsconfig.json
```

But when we run it, we got the error below.
```bash
node dist/helloWithType.js

> import greeting from "./greeting";
> ^^^^^^

> SyntaxError: Cannot use import statement outside a module
```

If we look at the transpiled file, they use `export` which is an ESModule way. Node.js does not recognize it.
```js
// dist/greetings.js
export default function greeting() {
    return 'Good morning';
}
```

```js
// dist/helloWithType.js
import greeting from "./greeting";
function helloWithType(name) {
    console.log(`${greeting()}, ${name} with types`);
}
helloWithType('Harum');
```

So we need to add additional configuration on our `compilerOptions` in `tsconfig.json` file. We can specify `module` to use `"CommonJS"`.
```json
{
  "compilerOptions": {
    // Use common js.
    "module": "CommonJS",
    // Target latest version of ECMAScript.
    "target": "ES2018",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "Node",
    // Handle DOM definition and console
    "lib": ["ESNext", "ESNext.AsyncIterable", "DOM"],
    // Import non-ES modules as default imports.
    "esModuleInterop": true,
    // Process & infer types from .js files.
    "allowJs": true,
    // Enable strictest settings like strictNullChecks & noImplicitAny.
    "strict": true,
    "outDir": "./dist",
  },
  "include": [ "src" ]
}
```

After changing the configuration, we can run the command again. It should run successfully.

```bash
npx tsc -p tsconfig.json
node dist/helloWithType.js

> Good morning, Harum with types
```

## Handle Alias

### Problem
Let say we want to add alias on our project as follow.
```json
  "compilerOptions": {
    "paths": {
      "~/*": ["./*"],
    }
  }
```

Let say we also add new file
```ts
// lib/getDate
export default function getDate(): string {
  return (new Date()).toLocaleString()
}

```

And adjust current file to
```ts
import getDate from "~/lib/getDate"
import greeting from "./greeting"

function helloWithType(name: string): void {
  console.log(getDate())
  console.log(`${greeting()}, ${name} with types`)
}

helloWithType('Harum')
```

But we got error when run it using `tsc`
```bash
npx tsc -p tsconfig.json
node dist/src/helloWithType.js

> Error: Cannot find module '~/lib/getDate'
```

or using `ts-node`
```bash
npx ts-node src/helloWithType.ts

> Error: Cannot find module '~/lib/getDate'
```

From the above error we know that TypeScript does not change the module path. We need a way so Node.js can locate `~/lib/getDate` successfully.

### Solution
We can use `module-alias` to make Node.js be able to recognize the alias path.

```bash
yarn add module-alias
yarn add -D @types/module-alias
```

Add the following line into `package.json`
```json
"_moduleAliases": {
  "~/lib"      : "./lib"
}
```

```ts
// add module alias register
import 'module-alias/register'

import getDate from "~/lib/getDate"
import greeting from "./greeting"

function helloWithType(name: string): void {
  console.log(getDate())
  console.log(`${greeting()}, ${name} with types`)
}

helloWithType('Harum')
```

When we want to run the code, it will run successfully.
```bash
npx ts-node src/helloWithType.ts

> 2/18/2022, 10:45:34 AM
> Good morning, Harum with types
```