import { Histogram } from "types/histogram";

export class StateMachine {
  strings: string[];
  histograms: Histogram[][];
  winners: string[];

  constructor() {
    this.strings    = [];
    this.histograms = [];
    this.winners    = [];
  }

}