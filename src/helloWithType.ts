import 'module-alias/register'
import getDate from "~/lib/getDate"
import greeting from "./greeting"

function helloWithType(name: string): void {
  console.log(getDate())
  console.log(`${greeting()}, ${name} with types`)
}

helloWithType('Harum')