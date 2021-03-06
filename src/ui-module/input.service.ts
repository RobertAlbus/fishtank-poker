import { StateMachine } from '../state-module/state-machine';

export class InputService {

  private rl = require('readline-sync');
  private inputValidator = new RegExp('(([2-9TJQKA]{5})( ))*([2-9TJQKA]{5})', 'i');

  constructor(private state: StateMachine) {
  }

  public getUserInput(data?: string[]): void {

    if (!data) {
      const quantity = this.getNumberOfRounds();
      data = this.getRounds(quantity);
    }

    data.map( (d, i) => {
      data[i] = d.toUpperCase();
    });

    this.state.strings = data;
  }

  private getNumberOfRounds(): number {
    const response = this.rl.questionInt('How many pairs of hands? ');
    if (response > 0) {
      return response;
    }
    if (response === 0 ) {
      process.exit();
    }

    console.log('Please enter a positive number, or 0 to exit');
    this.getNumberOfRounds();
  }

  private getRounds(quantity: number): string[] {
    const hands: string[] = [];

    for (let i = 0; i < quantity; ++i) {
      hands.push(this.getRound());
    }
    return hands;
  }

  private getRound(): string {
    const response: string = this.rl.question('=> ');
    if (this.inputValidator.test(response)) {
      return response;
    }
    console.log('Invalid. Please try again with valid cards: 0-9,TJQKA');
    return this.getRound();
  }

}
