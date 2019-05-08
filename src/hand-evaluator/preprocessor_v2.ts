import { cardEnum } from "../types/hand.enum";
import { Histogram, HistogramItem } from '../types/histogram'

function batchStringToHistograms(strings: string[]): Histogram[][] {
  let histograms: Histogram[][] = [];

  strings.map( (string, i) => {
    histograms.push(stringToHistograms(string));
  })

  return histograms;
}

function stringToHistograms(input: string): Histogram[] {
  // discreet hands from one string
  let hands = stringToHands(input);
  let histograms: Histogram[] = []

  hands.map (hand => {
    let cards = handToCards(hand);
    let numeric = cardsToNumeric(cards);
    let histogram = numericToHistogram(numeric);

    histograms.push(histogram)
  })

  return histograms
}

////////
// TRANSFORMATIONS

function stringToHands(input: string): string[] {
  return input.split(' ');
}

function handToCards(hand: string): string[] {
  return hand.split('')
}

function cardsToNumeric(hand: string[]): number[] {
  let numeric: number[] = [];
  hand.map( card => {
    numeric.push(parseInt(card) || cardEnum[card])
  })
  return numeric;
}

function numericToHistogram(hand: number[]): Histogram {
  let histogram: Histogram = []

  while(hand.length > 0) {
    let value: number = hand[0];
    let count: number = 0;
    for (let card of hand) {
      if (card === value) {
        ++count
      }
    }
    let hi = new HistogramItem(value, count)
    // console.log(hi.value, hi.quantity)
    histogram.push(new HistogramItem(value, count));
    hand = hand.filter( c => c !== value);
  }
  
  return histogram
}
