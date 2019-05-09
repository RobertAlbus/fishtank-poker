import { Histogram } from "types/histogram";

export class StateMachine {
  strings: string[];
  histograms: Histogram[][];

  constructor() {
    this.strings = []
    this.histograms = []
  }

}