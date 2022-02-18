import greeting from "./greeting"

function helloWithType(name: string): void {
  console.log(`${greeting()}, ${name} with types`)
}

helloWithType('Harum')