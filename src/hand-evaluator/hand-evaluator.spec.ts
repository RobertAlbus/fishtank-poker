import { HandEvaluator } from "./hand-evaluator";
import { StateMachine } from "../state-module/state-machine";
import * as data from '../mock-data/mock.data'

describe('Hand evaluator', () => {
  let state = new StateMachine();
  let evaluator = new HandEvaluator(state);

  it('should create', () => {
    expect(evaluator).toBeTruthy();
  });

  it('should compute a winner', () => {

    state.init();

    let results = evaluator.computeWinner(data.histograms[0]);
    expect(results).toEqual({enums: data.enums[0], winner: data.winnerStrings[0]});

    state.init();
  });

  it('should compute a set of winners', () => {
    
    state.init()

    let results = evaluator.computeWinners(data.histograms);
    expect(results).toEqual({enums: data.enums, winners: data.winnerStrings});

    state.init();
  })
})