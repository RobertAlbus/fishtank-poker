import { StateMachine } from 'state-module/state-machine';
import { handEnum } from '../types/hand.enum';

export class OutputService {
  constructor(private state: StateMachine) {

  }

  printAll(): void {
    this.printRounds(this.state.enums, this.state.winnerStrings);
  }

  private printRounds(enums: handEnum[][], winners: string[]): void {
    enums.map( (e, i) => {
      this.printRound(e, winners[i]);
    });
  }

  private printRound(enums: handEnum[], winner: string): void {
    let output = '';
    enums.map( e => {
      output += handEnum[e] + ' ';
    });
    console.log(`${output} ${winner}`);
  }
}
