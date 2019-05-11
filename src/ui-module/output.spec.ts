import { StateMachine } from "../state-module/state-machine";
import { OutputService } from "./output.service";

describe('Output service', () => {

  let state = new StateMachine();
  let output = new OutputService(state);

  it('should create', () => {
    expect(output).toBeTruthy();
console.log(console.log.length)
  })
})