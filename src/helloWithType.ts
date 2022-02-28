import 'module-alias/register'
import getDate from "~/lib/getDate"
import greeting from "./greeting"

export default function helloWithType(name: string): string {
  console.log(getDate())
  console.log(`${greeting()}, ${name} with types`)
  return `${greeting()}, ${name} with types updated`
}

helloWithType('Harum')