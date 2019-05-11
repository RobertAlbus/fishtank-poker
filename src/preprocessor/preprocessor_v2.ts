import { cardEnum } from "../types/hand.enum";
import { Histogram, HistogramItem } from '../types/histogram'
import { StateMachine } from "../state-module/state-machine";

export class Preprocessor {

  constructor(private state: StateMachine) {

  }

  processAll() {
    this.state.histograms = 
    this.batchStringToHistograms(this.state.strings)
  }

  // creates an array of sets of sorted histograms
  batchStringToHistograms(strings: string[]): Histogram[][] {
    let histograms: Histogram[][] = [];
  
    strings.map( (string, i) => {
      histograms.push(this.stringToHistograms(string));
    })
  
    return histograms;
  }

  // creates one sorted histogram per hand in the string
  stringToHistograms(input: string): Histogram[] {

    let hands = this.stringToHands(input);
    let histograms: Histogram[] = []
  
    hands.map (hand => {
      let cards = this.handToCards(hand);
      let numeric = this.cardsToNumeric(cards);
      let histogram = this.numericToHistogram(numeric);
      let histogramSorted = this.sortHistogram(histogram);
  
      histograms.push(histogramSorted)
    })
  
    return histograms
  }

  ////////
  // TRANSFORMATIONS

  // split strings into discreet hands
  private stringToHands(input: string): string[] {
    return input.split(' ');
  }

  //  hands into discreet cards
  private handToCards(hand: string): string[] {
    return hand.split('')
  }
  
  // transform card values into numerical values
  private cardsToNumeric(hand: string[]): number[] {
    let numeric: number[] = [];

    hand.map( card => {
      numeric.push(parseInt(card) || cardEnum[card])
    })

    return numeric;
  }

  // represent frequency of card values as histogram elements
  private numericToHistogram(hand: number[]): Histogram {
    let histogram: Histogram = []
  
    while(hand.length > 0) {
      let value: number = hand[0];
      let quantity: number = 0;
      for (let card of hand) {
        if (card === value) {
          ++quantity
        }
      }
      histogram.push(new HistogramItem(value, quantity));
      hand = hand.filter( c => c !== value);
    
    }

    return histogram
  }

  // !!! IMPORTANT !!!

  // later actions assume 
  // 1. sort descending: histogram.quantity
  // 2. if tied => sort descending: histogram.value
  private sortHistogram(histogram: Histogram): Histogram {

    return histogram.sort( (a, b) => {
      if (a.quantity === b.quantity) {
        return b.value - a.value
      }
      return b.quantity - a.quantity
    })
  }
  
}
