import { StateMachine } from "../state-module/state-machine";
import { Histogram } from "../types/histogram";
import { handEnum as hand, handEnum} from "../types/hand.enum";

export class HandEvaluator {

  // assumes histogram entries are sorted in descending order:
  // primary sort: frequency
  // secondary sort: value

  constructor(private state: StateMachine) {

  }

  public evaluateAll(): void {
    let results = this.computeWinners(this.state.histograms)
    this.state.winnerStrings = results.winners;
    this.state.enums = results.enums;
  }

  public computeWinners(rounds: Histogram[][]): {winners: string[], enums: handEnum[][]} {
    let winners: string[] = [];
    let enums: handEnum[][] = []

    rounds.map( round => {
      let result = this.computeWinner(round);
      winners.push(result.winner);
      enums.push(result.enums);
    })

    return {winners, enums};
  }

  public computeWinner(histograms: Histogram[]): { enums: handEnum[], winner: string } {
    
    let enums: handEnum[] = [];
    histograms.map( histogram => {
      // generate signature
      let signature = this.histogramToSignature(histogram)
      // determine enum from signature
      enums.push(this.signatureToHandEnum(signature, histogram))
    })

    let winnerIndex: number[];
    if (this.getWinnerFromEnums(enums).length > 0) {
      winnerIndex = this.getWinnerFromEnums(enums)
    } else {
      winnerIndex = this.getWinnerFromHistograms(histograms, enums);
    }


    let winner: string = this.playerIndexToPlayerLetter(...winnerIndex);
    
    return { enums: enums, winner: winner};
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

    let contenders: {
      index?: number,
      handRank?: handEnum,
      histogram?: Histogram
    }[];
    // create filtered list of: histograms tied by signature && their index
    enums.map( (e, index) => {

      // check for handEnum.STRAIGHT
      // if histogram[0] === 14 && histogram[1] === 2
      // => histogram.push(histogram.shift)
      // histogram[4].value = 1

      if (e === highestHand) {
        if (contenders !== undefined ) {
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
    // ie two hands of the same type, the higher card wins

    // outer for loop iterates /through/ histograms depthwise
    let histogramDepth = contenders[0].histogram.length
    for (let depth = 0; depth < histogramDepth; ++depth) {
      
      // inner map iterates across histograms
      // to find highest card value
      let highestCardValue: number = 0;
      contenders.map( c => {
        let currentValue = c.histogram[depth].value
        if (highestCardValue < currentValue) {
          highestCardValue = currentValue
        }
      })


      //WHY NOT FILTERING


      // filter contenders to exclude contenders with 
      // card value lower than highest for this given index
      contenders = contenders.filter( c => {
        let currentValue = c.histogram[depth].value;
        return currentValue === highestCardValue
        // return c.histogram[depth].value === highestCardValue
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
//debug
// let s = new StateMachine()
// let x = new HandEvaluator(s)
// let hist = [{value: 2, quantity: 3},{value: 3, quantity: 2}]


// let sig = x.histogramToSignature(hist)
// let enu = x.signatureToHandEnum(sig, hist)
// console.log("histogram: ", hist)
// console.log("signature: ", sig)
// console.log("enum: ", hand[enu], enu)

// console.log(x.playerIndexToPlayerLetter(0))
// console.log(x.playerIndexToPlayerLetter(66))
// console.log(x.playerIndexToPlayerLetter(1,2))
// console.log(x.playerIndexToPlayerLetter(...[1,2]))