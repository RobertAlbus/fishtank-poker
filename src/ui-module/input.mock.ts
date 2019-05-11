import { iInputService } from "./input.interface";
import { StateMachine } from "../state-module/state-machine";

export class InputServiceMock implements iInputService{

  constructor(private state: StateMachine) {

  }
  public getUserInput() {
    this.state.strings = [
      "24578 2578A",
      "22456 33678",
      "22449 44339",
      "444JK 666JK",
      "A2345 TJQKA",
      "33322 333AA",
      "44445 66667"
    ]
  } 
}

