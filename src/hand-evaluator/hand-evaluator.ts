import { StateMachine } from '../state-module/state-machine';
import { Histogram } from '../types/histogram';
import { handEnum as hand, handEnum} from '../types/hand.enum';

export class HandEvaluator {

  // assumes edge case low-ace already caught by preprocessor
  // assumes histogram entries are sorted in descending order:
  // primary sort: frequency
  // secondary sort: value

  constructor(private state: StateMachine) {

  }

  public evaluateAll(): void {
    const results = this.computeWinners(this.state.histograms);
    this.state.winnerStrings = results.winners;
    this.state.enums = results.enums;
  }

  public computeWinners(rounds: Histogram[][]): {winners: string[], enums: handEnum[][]} {
    const winners: string[] = [];
    const enums: handEnum[][] = [];

    rounds.map( round => {
      const result = this.computeWinner(round);
      winners.push(result.winner);
      enums.push(result.enums);
    });

    return {winners, enums};
  }

  public computeWinner(histograms: Histogram[]): { enums: handEnum[], winner: string } {

    const enums: handEnum[] = [];
    histograms.map( histogram => {
      // generate signature
      const signature = this.histogramToSignature(histogram);
      // determine enum from signature
      enums.push(this.signatureToHandEnum(signature, histogram));
    });

    let winnerIndex: number[];
    if (this.getWinnerFromEnums(enums).length > 0) {
      winnerIndex = this.getWinnerFromEnums(enums);
    } else {
      winnerIndex = this.getWinnerFromHistograms(histograms, enums);
    }


    const winner: string = this.playerIndexToPlayerLetter(...winnerIndex);

    return { enums: enums, winner: winner};
  }

  private getWinnerFromEnums(enums: handEnum[]): number[] {

    const highestHand = Math.max(...enums);
    const quantityOfHighestHand = enums.filter( e => e === highestHand).length;

    // if there is 1 obvious winner based on hand rank alone
    if (quantityOfHighestHand === 1) {
      return [enums.indexOf(highestHand)];
    }
    return [];
  }

  // used to determine who wins or ties when
  // there is no obvious winner that can be determined by hand rank alone
  private getWinnerFromHistograms(histograms: Histogram[], enums: handEnum[]): number[] {

    // determine highest handEnum value present
    // aka the type of hand that wins
    const highestHand = Math.max(...enums);

    let contenders: {
      index?: number,
      handRank?: handEnum,
      histogram?: Histogram
    }[]; // TODO initialize here and remove initialization logic @ line 87 & 94
    // create filtered list of: histograms tied by signature && their index
    // needed if n>2 players because it's possible that not all players have a tied handEnum
    enums.map( (e, index) => {

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
          } ];
        }
      }
    });

    // eliminate contenders with lowest card rank for a given histogram position
    // until 1 left or all positions evaluate to a tie
    // ie two hands of the same handEnum, the higher card wins

    // outer for loop iterates /through/ histograms depthwise
    // all constenders will have the same histogram[].length
    const histogramDepth = contenders[0].histogram.length;
    for (let depth = 0; depth < histogramDepth; ++depth) {

      // inner map iterates across histograms
      // to find highest card value
      let highestCardValue = 0;
      contenders.map( c => {
        const currentValue = c.histogram[depth].value;
        if (highestCardValue < currentValue) {
          highestCardValue = currentValue;
        }
      });

      // filter contenders to exclude contenders with
      // card value lower than highest for this given index
      contenders = contenders.filter( c => {
        const currentValue = c.histogram[depth].value;
        return currentValue === highestCardValue;
        // return c.histogram[depth].value === highestCardValue
      });

      // short circuit
      // winner found
      if (contenders.length === 1) {
        break;
      }
    }

    // map the indexes of winner(s) to array for returning
    const winners: number[] = [];
    contenders.map( c => {
      winners.push(c.index);
    });
    return winners;
  }

  private histogramToSignature(histogram: Histogram): string {

    let signature = '';
    histogram.map( item => {
      signature += item.quantity.toString();
    });

    return signature.trim();
  }

  private signatureToHandEnum(signature: string, histogram: Histogram): handEnum {

    switch (signature) {
      case '41': {
        return hand.FOUROFAKIND;
      }
      case '32': {
        return hand.FULLHOUSE;
      }
      case '311': {
        return hand.THREEOFAKIND;
      }
      case '221': {
        return hand.TWOPAIR;
      }
      case '2111': {
        return hand.PAIR;
      }
      case  '11111': {
        if (histogram[0].value - histogram[4].value === 4) {
          return hand.STRAIGHT;
        }
        return hand.HIGHCARD;
      }
      default: {
        return hand.CHEATER;
      }
    }
  }

  private playerIndexToPlayerLetter(...args: number[]): string {

    let output = '';
    const a = 97; // ASCII offset to 'a' from 1
    args.map( arg => {
      if (arg < 26) {
        output += String.fromCharCode(arg + a);
      }
      if (26 < arg) {
        const nn: number = arg / 26;
        output +=  '|' + String.fromCharCode(nn + a - 1) + String.fromCharCode( (arg % 26 - 1) + a); + '|';
      }
    } );

    return output;
  }

}
