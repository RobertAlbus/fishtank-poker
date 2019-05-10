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
  public computeWinners(rounds: Histogram[][]): string[] {
    let winners: string[] = [];

    rounds.map( round => {
      winners.push(this.computeWinner(round))
    })

    return winners;
  }

  public computeWinner(histograms: Histogram[]): string {
    
    let enums: handEnum[] = [];
    histograms.map( histogram => {
      // generate signature
      let signature = this.histogramToSignature(histogram)
      // determine enum from signature
      enums.push(this.signatureToHandEnum(signature, histogram))
    })

    let winnerIndex: number[] = 
      this.getWinnerFromEnums(enums) || this.getWinnerFromHistograms(histograms, enums);

    let winner: string = this.playerIndexToPlayerLetter(...winnerIndex);
    
    return winner;
  }

  getWinnerFromEnums(enums: handEnum[]): number[] {

    let highestHand = Math.max(...enums)
    let quantityOfHighestHand = enums.filter( e => e === highestHand).length

    // if there is 1 obvious winner based on hand rank alone
    if (quantityOfHighestHand === 1) {
      return [enums.indexOf(highestHand)]
    }
    return [];
  }

  // used to determine who wins or ties when
  // there is no obvious winner that can be determined by hand rank alone
  getWinnerFromHistograms(histograms: Histogram[], enums: handEnum[]): number[] {

    // determine highest handEnum value present
    // aka the type of hand that wins
    let highestHand = Math.max(...enums)

    // create filtered list of: histograms tied by signature && their index
    let contenders: [{
      index: number,
      handRank: handEnum,
      histogram: Histogram
    }];

    enums.map( (e, index) => {
      if (e === highestHand) {
        if (contenders[0]) {
          // if initialized => push
          contenders.push({
            index: index, 
            handRank: enums[index], 
            histogram: histograms[index]
          });
        } else {
          // else => initialize
          contenders = [ {
            index: index, 
            handRank: enums[index], 
            histogram: histograms[index]
          } ]
        }
      }
    })

    // eliminate contenders with lowest card rank for a given histogram position
    // until 1 left or all positions evaluate to a tie

    // outer for loop iterates /through/ histogram
    let histogramDepth = contenders[0].histogram.length
    for (let depth = 0; depth < histogramDepth; ++depth) {
      let highestCardValue: number = 0;

      // inner map iterates across histograms
      //    finds highest card value
      contenders.map ( c => {
        let currentValue = c.histogram[depth].value
        if (currentValue > highestCardValue) {
          highestCardValue = currentValue
        }
      })

      // filter contenders to exclude contenders with 
      // card value lower than highest for this given index
      contenders.filter( c => {
        let currentValue = c.histogram[depth].value;
        return currentValue === highestCardValue
      })

      // short circuit
      if (contenders.length === 1) {
        break
      }
    }

    // map the indexes of winner(s) to array for returning
    let winners: number[] = [];
    contenders.map( c => {
      winners.push(c.index)
    })

    return winners
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

  playerIndexToPlayerLetter(...args: number[]): string {

    let output: string = "";
    let a: number = 97; // ASCII offset to 'a' from 1
    args.map( arg => {
      if (arg < 26) {
        output += String.fromCharCode(arg + a);
      }
      if (26 < arg) {
        let nn: number = arg/26;
        output +=  "|" + String.fromCharCode(nn + a - 1) + String.fromCharCode( (arg % 26 - 1) + a); + "|";
      }
    } )

    return output;
  }

}
