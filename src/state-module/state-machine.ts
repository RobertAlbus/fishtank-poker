import { Histogram } from "types/histogram";
import { handEnum } from "types/hand.enum";

export class StateMachine {
  strings: string[];
  histograms: Histogram[][];
  enums: handEnum[][];
  winnerStrings: string[];

  constructor() {
    this.strings        = [];
    this.histograms     = [];
    this.enums          = []
    this.winnerStrings  = [];
  }

}