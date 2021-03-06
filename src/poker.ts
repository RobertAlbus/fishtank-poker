import { StateMachine } from './state-module/state-machine';
import { InputService } from './ui-module/input.service';
import { HandEvaluator } from './hand-evaluator/hand-evaluator';
import { OutputService } from './ui-module/output.service';
import { Preprocessor } from './preprocessor/preprocessor_v2';
import { InputServiceMock } from './ui-module/input.mock';

const state         = new StateMachine();

const input         = new InputService(state);
const preprocessor  = new Preprocessor(state);
const evaluator     = new HandEvaluator(state);
const output        = new OutputService(state);

input.getUserInput();
preprocessor.processAll();
evaluator.evaluateAll();
output.printAll();
