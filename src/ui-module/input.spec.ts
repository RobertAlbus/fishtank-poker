import { StateMachine } from "../state-module/state-machine";
import { InputService } from "./input.service";

describe('input service', () => {

  const state = new StateMachine();
  const input = new InputService(state);

  it('should create', () => {
    expect(input).toBeTruthy()
  })
  it('should save data to state machine', () => {
    let roundOfCards = "23456 99988"
    input.getUserInput([roundOfCards])
    expect(state.strings).toEqual([roundOfCards])
  })

})