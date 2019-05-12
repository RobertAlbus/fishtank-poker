import { iInputService } from './input.interface';
import { StateMachine } from '../state-module/state-machine';
import * as data from '../mock-data/mock.data';

export class InputServiceMock implements iInputService{

  constructor(private state: StateMachine) {

  }
  public getUserInput() {
    this.state.strings = data.strings;
  }
}

