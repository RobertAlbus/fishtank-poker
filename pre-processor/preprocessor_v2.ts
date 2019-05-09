import { cardEnum } from "../src/types/hand.enum";
import { Histogram, HistogramItem } from '../src/types/histogram'
import { StateMachine } from "state-module/state-machine";

export class Preprocessor {

  constructor(private state: StateMachine) {

  }

  processAll() {
    this.state.histograms = 
    this.batchStringToHistograms(this.state.strings)
  }

  batchStringToHistograms(strings: string[]): Histogram[][] {
    let histograms: Histogram[][] = [];
  
    strings.map( (string, i) => {
      histograms.push(this.stringToHistograms(string));
    })
  
    return histograms;
  }

  stringToHistograms(input: string): Histogram[] {

    let hands = this.stringToHands(input);
    let histograms: Histogram[] = []
  
    hands.map (hand => {
      let cards = this.handToCards(hand);
      let numeric = this.cardsToNumeric(cards);
      let histogram = this.numericToHistogram(numeric);
  
      histograms.push(histogram)
    })
  
    return histograms
  }

  ////////
  // TRANSFORMATIONS

  stringToHands(input: string): string[] {
    return input.split(' ');
  }

  handToCards(hand: string): string[] {
    return hand.split('')
  }
  
  cardsToNumeric(hand: string[]): number[] {
    let numeric: number[] = [];

    hand.map( card => {
      numeric.push(parseInt(card) || cardEnum[card])
    })
    numeric = numeric.sort( (a,b) =>  a - b).reverse()

    return numeric;
  }

  numericToHistogram(hand: number[]): Histogram {
    let histogram: Histogram = []
  
    while(hand.length > 0) {
      let value: number = hand[0];
      let count: number = 0;
      for (let card of hand) {
        if (card === value) {
          ++count
        }
      }
      histogram.push(new HistogramItem(value, count));
      hand = hand.filter( c => c !== value);
    }
    
    return histogram
  }
  
}
