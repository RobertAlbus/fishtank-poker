import { Histogram } from '../types/histogram';
import { handEnum } from '../types/hand.enum';
import * as data from '../mock-data/mock.data';

export class StateMachineMock {
  strings       : string[];
  histograms    : Histogram[][];
  enums         : handEnum[][];
  winnerStrings : string[];

  constructor() {
    this.init();
  }

  init() {
    this.strings        = [];
    this.histograms     = [];
    this.enums          = [];
    this.winnerStrings  = [];
  }

  load(...members: string[]) {
    members.map( member => {
      this[member] = data[member];
    });
  }
  loadAll() {
    this.loadStrings();
    this.loadHistograms();
    this.loadEnums();
    this.loadWinnerStrings();
  }
  loadStrings(){
    this.strings = data.strings;
  }
  loadHistograms(){
    this.histograms = data.histograms;
  }
  loadEnums(){
    this.enums = data.enums;
  }
  loadWinnerStrings(){
    this.winnerStrings = data.winnerStrings;
  }
}
