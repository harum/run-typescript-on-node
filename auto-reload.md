# Auto Reload

When we develop our TypeScript code, we sometime want the auto reload/restarting functionality. Every time we change a code, we want the Node.js application to be restarted. One of the tools that we can use is [`nodemon`](https://github.com/remy/nodemon)

## Installation

```bash
yarn add nodemon -D
```
## Sample Server Setup
We will use [`fastify`](https://www.fastify.io/docs/latest/Reference/TypeScript/) as a Node.js server for this sample.
```bash
yarn add fastify
yarn add -D typescript @types/node
```

Create simple `fastify` server
```ts
// src/server.ts

import 'module-alias/register'
import { fastify } from 'fastify'
import helloWithType from './helloWithType'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return `${helloWithType('Harum')}\n`
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

## Script Setup
Add new script on the `package.json` file.
```json
"server": "nodemon --watch './src/*' -e ts --exec 'ts-node --project ./tsconfig.json -- ./src/server.ts'"
```

Descriptions:
-  `mockserver:run` is the script name. You can type `yarn mockserver:run` to run the script.
-  `nodemon` is the command that we want to run.
-  `--watch './src/*'` is the directory that we want to watch. Every time there is changes in it, we want the application to be restarted.
-  `-e ts`, for the `.ts` file, the directory option is not sufficient. We need to add the extension option to listen to TypeScript file.
-  `--exec 'ts-node --project ./tsconfig.json -- ./src/server.ts'` define the command that will be executed by nodemon. Here we will run `ts-node` with defined config and file.

## Running
After we setup the npm script, the we can run the command below to start the server.

```bash
yarn server
```

We can test the request.
```bash
curl http://127.0.0.1:8080/ping

>> Good morning, Harum with types
```

When we change some code in it, it will automatically restart the application.
```ts
// src/helloWithType.ts
...
  return `${greeting()}, ${name} with types updated`
...
```

```bash
curl http://127.0.0.1:8080/ping

>> Good morning, Harum with types updated
```