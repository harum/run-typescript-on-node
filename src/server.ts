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
