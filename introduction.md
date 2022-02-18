# Introduction

When we write TypeScript, the type checking rule is defined on our `tsconfig.json` file. We can make our type checking strict, or we can make the type checking loose.

When we write `.ts` file without type declaration in it, Node.js still be able to run the code. For example we have this TypeScript file.
```ts
// src/helloWithoutType.ts

function helloWithoutType() {
  console.log('Hello world without types')
}

helloWithoutType()
```

When we run it, Node.js still be able to recognized it.
```bash
node src/helloWithoutType.ts

> Hello world without types
```

But when we run TypeScript file with type declaration, Node.js can not run the code.

```ts
// src/helloWithType.ts

function helloWithType(name: string): void {
  console.log(`Hello ${name} with types`)
}

helloWithType('Harum')
```

When we run it, Node.js still can not recognized it.
```bash
node src/helloWithType.ts

> function helloWithType(name: string): void {
                           ^
> SyntaxError: Unexpected token ':'
```

To make `src/helloWithType.ts` successfully run on Node.js we need some additional setup and libraries. Continue reading [here](https://github.com/harum/run-typescript-on-node/blob/main/run-ts.md)