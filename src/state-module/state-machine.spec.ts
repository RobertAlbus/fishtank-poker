import { StateMachine } from './state-machine';

describe('State machine', () => {
  const state = new StateMachine();

  it('should create', () => {
    expect(state).toBeTruthy();
  });

  it('should initialize fields upon creation, init()', () => {
    expect(state['strings']).toBeTruthy();
    expect(state['histograms']).toBeTruthy();
    expect(state['enums']).toBeTruthy();
    expect(state['winnerStrings']).toBeTruthy();
  });

});