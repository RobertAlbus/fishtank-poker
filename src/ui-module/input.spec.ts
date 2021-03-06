import { StateMachine } from '../state-module/state-machine';
import { InputService } from './input.service';

describe('input service', () => {

  const state = new StateMachine();
  const input = new InputService(state);

  it('should create', () => {
    expect(input).toBeTruthy();
  });
  it('should save data to state machine', () => {

    state.init();

    const roundOfCards = '23456 99988';
    input.getUserInput([roundOfCards]);
    expect(state.strings).toEqual([roundOfCards]);
    state.init();
  });
  it('should upcase any valid input', () => {
    state.init();

    input.getUserInput(['tjqka tttaa']);
    expect(state.strings[0]).toEqual('TJQKA TTTAA');

    state.init();
  });

});