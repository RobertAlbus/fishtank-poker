import { StateMachine } from "../state-module/state-machine";
import { Histogram } from "../types/histogram";
import { handEnum as hand, handEnum} from "../types/hand.enum";

export class HandEvaluator {

  constructor(private state: StateMachine) {

  }

  public evaluateAll(): void {
    this.state.winners = this.computeWinners(this.state.histograms)
  }

// assumes histogram entries are sorted in descending order:
  // primary sort: frequency
  // secondary sort: value
  public computeWinners(histograms: Histogram[][]): string[] {
    let winners: string[] = [];

    return winners;
  }
  
  public computeWinner(histograms: Histogram[]): string {
    let winner: string = "";
    let enums: handEnum[] = [];

    histograms.map( histogram => {
      let signature = this.histogramToSignature(histogram)
      enums.push(this.signatureToHandEnum(signature, histogram))
    })



    return winner;
  }

  histogramToSignature(histogram: Histogram): string {
    let signature: string = ""
    histogram.map( item => {
      signature += item.quantity.toString()
    })
    return signature.trim();
  }

  signatureToHandEnum(signature: string, histogram: Histogram): handEnum {
    switch(signature) {
      case '41': {
        return hand.FOUROFAKIND
      }
      case '32': {
        return hand.FULLHOUSE
      }
      case '311': {
        return hand.THREEOFAKIND
      }
      case '221': {
        return hand.TWOPAIR
      }
      case '2111': {
        return hand.PAIR
      }
      case  '11111': {
        if (histogram[0].value - histogram[4].value === 4) {
          return hand.STRAIGHT
        }
        if (histogram[0].value === 14 ) {
          histogram.push(histogram.shift());
          histogram[4].value = 1;
          if (histogram[0].value - histogram[4].value === 4) {
            return hand.STRAIGHT
          }
        }
        return hand.HIGHCARD
      }
      default: {
        return hand.CHEATER
      }
    }
  }

  compareEnums(enums: handEnum[]) {
    let winnersIndexes: number[] = [];
    let best = enums.sort()[0]

    for (let i = 0; i < enums.length; ++i){
      if (enums[i] === best) {
        winnersIndexes.push(i);
      }
    }
  }
  compareHistograms() {

  }
  playerIndexToPlayerLetter(n: number): string {
    let a: number = 97; // ASCII offset to a from 1
    if (n < 26) {
      return String.fromCharCode(n + a);
    }
    if (26 < n) {
      let nn: number = n/26
      return String.fromCharCode(nn + a - 1) + String.fromCharCode( (n % 26 - 1) + a);
    }
  }

}

//debug
let s = new StateMachine()
let x = new HandEvaluator(s)
let hist = [{value: 2, quantity: 3},{value: 3, quantity: 2}]

let sig = x.histogramToSignature(hist)
let enu = x.signatureToHandEnum(sig, hist)
console.log("histogram: ", hist)
console.log("signature: ", sig)
console.log("enum: ", hand[enu], enu)

console.log(x.playerIndexToPlayerLetter(0))
console.log(x.playerIndexToPlayerLetter(66))


