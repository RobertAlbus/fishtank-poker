import { StateMachine } from "../state-module/state-machine";
import { Z_RLE } from "zlib";

export class InputService {

  private rl = require('readline-sync')
  private inputValidator = new RegExp('([0-9AKQJT]{5})( )([0-9AKQJT]{5})', 'i')
  

  constructor(private state: StateMachine) {
  }

  public getUserInput(data?: string[]): void {
    if (!data) {
      let quantity = this.getNumberOfRounds();
      let data = this.getRounds(quantity);
    }
    this.state.strings = data;
  }
  
  private getNumberOfRounds():number {
    let response = this.rl.questionInt('How many pairs of hands? ');
    if (response > 0) {
      return response;
    } 
    if (response === 0 ) {
      process.exit()
    }
    
    console.log('Please enter a positive number or 0 to exit');
    this.getNumberOfRounds()
  }

  private getRounds(quantity: number): string[] {
    let hands: string[] = [];

    for (let i = 0; i < quantity; ++i) {
      hands.push(this.getRound())
    }
    return hands
  }

  private getRound(): string {
    let response = this.rl.question('=> ');
    if (this.inputValidator.test(response)) {
      return response;
    }
    console.log('Invalid. Please try again with valid cards: 0-9,TJQKA');
    return this.getRound();
  }

}
