import { StateMachine } from "./state-module/state-machine";
import { InputService } from "./ui-module/input.service";
import { Preprocessor } from "./preprocessor/preprocessor_v2";
import { HandEvaluator } from "./hand-evaluator/hand-evaluator";
import { OutputService } from "./ui-module/output.service";

import * as data from './mock-data/mock.data'

describe('e2e tests: Program', () => {

  let state         = new StateMachine();
  let input         = new InputService(state);
  let preprocessor  = new Preprocessor(state);
  let evaluator     = new HandEvaluator(state);
  let output        = new OutputService(state);

  it('should initialize everything', () => {

    expect(state        ).toBeTruthy();
    expect(input        ).toBeTruthy();
    expect(preprocessor ).toBeTruthy();
    expect(evaluator    ).toBeTruthy();
    expect(output       ).toBeTruthy();
  })

  it('should have correct results', () => {

    input.getUserInput(data.strings)
    preprocessor.processAll();
    evaluator.evaluateAll();
    expect(state.enums        ).toEqual(data.enums);
    expect(state.histograms   ).toEqual(data.histograms);
    expect(state.winnerStrings).toEqual(data.winnerStrings);
  })
})