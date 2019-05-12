import { cardEnum } from '../types/hand.enum';
import { Histogram, HistogramItem } from '../types/histogram';
import { StateMachine } from '../state-module/state-machine';

////////
// preprocessing pipeline
// see preprocessing.md for a visual breakdown

// strings            => hands
//
// hands              => hands with discreet cards,
//
// hands with cards   => cards by numeric value
//
// numeric hands      => histograms
//
// histograms         => sorted histograms
//
// sorted histograms  => catch edgecase low-ace straight 1-5
//
////////

export class Preprocessor {

  constructor(private state: StateMachine) {

  }

  processAll() {
    this.state.histograms =
    this.batchStringToHistograms(this.state.strings);
  }

  // creates an array of sets of sorted histograms
  batchStringToHistograms(strings: string[]): Histogram[][] {
    const histograms: Histogram[][] = [];

    strings.map( (string, i) => {
      histograms.push(this.stringToHistograms(string));
    });

    return histograms;
  }

  // creates one sorted histogram per hand in the string
  stringToHistograms(input: string): Histogram[] {

    const hands = this.stringToHands(input);
    const histograms: Histogram[] = [];

    hands.map (hand => {
      const cards = this.handToCards(hand);
      const numeric = this.cardsToNumeric(cards);
      const histogram = this.numericToHistogram(numeric);
      const histogramSorted = this.sortHistogram(histogram);
      const histogramSorted_catchLowAce = this.catchEdgeCase_StraightLowAce(histogramSorted);

      histograms.push(histogramSorted_catchLowAce);
    });

    return histograms;
  }

  ////////
  // TRANSFORMATIONS

  // split strings into discreet hands
  private stringToHands(input: string): string[] {
    return input.split(' ');
  }

  //  hands into discreet cards
  private handToCards(hand: string): string[] {
    return hand.split('');
  }

  // transform card values into numerical values
  private cardsToNumeric(hand: string[]): number[] {
    const numeric: number[] = [];

    hand.map( card => {
      numeric.push(parseInt(card) || cardEnum[card]);
    });

    return numeric;
  }

  // represent frequency of card values as histogram elements
  private numericToHistogram(hand: number[]): Histogram {
    const histogram: Histogram = [];

    while (hand.length > 0) {
      const value: number = hand[0];
      let quantity = 0;
      for (const card of hand) {
        if (card === value) {
          ++quantity;
        }
      }
      histogram.push(new HistogramItem(value, quantity));
      hand = hand.filter( c => c !== value);

    }

    return histogram;
  }

  // !!! IMPORTANT !!!

  // later actions assume
  // 1. sort descending: histogram.quantity
  // 2. if tied => sort descending: histogram.value
  private sortHistogram(histogram: Histogram): Histogram {

    return histogram.sort( (a, b) => {
      if (a.quantity === b.quantity) {
        return b.value - a.value;
      }
      return b.quantity - a.quantity;
    });
  }

  // input histogram must be sorted
  private catchEdgeCase_StraightLowAce(histogram: Histogram): Histogram {
    if (
      histogram[0].value === 14 &&
      histogram[1].value === 5 &&
      histogram[2].value === 4 &&
      histogram[3].value === 3 &&
      histogram[4].value === 2
      ) {
        const temp: HistogramItem = histogram.shift();
        temp.value = 1;
        histogram.push(temp);
      }

      return histogram;
  }

}
