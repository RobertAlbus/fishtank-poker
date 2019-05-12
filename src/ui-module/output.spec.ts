import { OutputService } from './output.service';
import { StateMachineMock } from '../state-module/state-machine.mock';
import { handEnum } from '../types/hand.enum';

describe('Output service', () => {

  const state = new StateMachineMock();
  const output = new OutputService(state);

  it('should create', () => {
    expect(output).toBeTruthy();
  });

  it('should write to console', () => {

    // stub console.log
    const cLog = console.log;
    const logs: string[] = [];
    console.log = (arg) => {
      logs.push(arg.toString());
      // cLog(arg); // pass-through to original console.log if needed
    };

    // load mock data into state
    state.init();
    state.loadAll();

    // create output strings
    const completeWinnerStrings: string[] = [];

    state.enums.map( (hand, index) => {
      let enumString = '';
      hand.map( i => {
        enumString += handEnum[i] + ' ';
      });
      completeWinnerStrings.push(`${enumString} ${state.winnerStrings[index]}`);
    });

    // assert console log is the expect strings
    output.printAll();
    expect(logs).toEqual(completeWinnerStrings);

    state.init();
  });
});
