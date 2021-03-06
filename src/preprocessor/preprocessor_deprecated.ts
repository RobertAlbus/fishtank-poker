import { cardEnum } from '../types/hand.enum';

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

function batch(input: string[]): HistogramItem[][][] {
  const hands       = stringsToHands(input);
  const cards       = handsToCards(hands);
  const numeric     = cardsToNumeric(cards);
  const histograms  = numericToHistograms(numeric);

  return histograms;
}

function stringsToHands(rawInput: string[]): string[][] {
  const hands: string[][] = [];

  rawInput.map ( round => {
    hands.push(round.split(' '));
  });

  return hands;
}

function handsToCards(rounds: string[][]): string[][][] {
  const cards: string[][][] = [];

  rounds.map( (round, i) => {
    cards.push([]); // initialize array position
    round.map( (hand, ii) => {
      cards[i].push( hand.split('') );
    });
  });
  return cards;
}

function cardsToNumeric(rounds: string[][][]): number[][][] {
  const numeric: number[][][] = [];

  rounds.map( (hands, i) => {
    numeric.push([]); // initialize array position
    hands.map( (hand, ii) => {
      numeric[i].push([]); // initialize array position
      hand.map( (card, iii) => {
        numeric[i][ii].push(parseInt(card) || cardEnum[card]);
      });
    });
  });
  return numeric;
}

function numericToHistograms(numeric: number[][][]): HistogramItem[][][]  {
  const histograms: HistogramItem[][][] = [];
  numeric.map( (round, i) => {
    histograms.push([]); // initialize array position
    round.map( (hand, ii) => {
      histograms[i].push([]); // initialize array position



// TODO



      histograms[i][ii].push({value: i, quantity: i});


    });
  });
  return histograms;
}

export interface HistogramItem {
  value: number;
  quantity: number;
}
export interface Histogram {
  hand: HistogramItem[];
}

