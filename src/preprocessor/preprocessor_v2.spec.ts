import { StateMachine } from "../state-module/state-machine";
import { Preprocessor } from "./preprocessor_v2";
import { InputServiceMock as InputService } from "../ui-module/input.mock";
import { Histogram, HistogramItem } from "../types/histogram";
import * as data from '../mock-data/mock.data'

describe('Preprocessor', () => {

  let state = new StateMachine;
  let preprocessor = new Preprocessor(state);

  it('should create', () => {
    expect(preprocessor).toBeTruthy();
  })

  describe('string to histogram public API', () => {

    it('should convert a string to the correct histogram[]', () => {

      let histograms: Histogram[] = preprocessor.stringToHistograms(data.strings[0]);
      
      expect(histograms.length).toBeTruthy();
      expect(histograms).toEqual(data.histograms[0]);

    });

    it('should convert string[] to Histogram[][]', () => {

      let results: Histogram[][] = preprocessor.batchStringToHistograms(data.strings)
      expect(results).toEqual(data.histograms)
    })

    it('should get and set data from state machine', () => {
      
      let input = new InputService(state);
      
      // ensure state.strings is empty then populated
      expect(state.strings.length).toBeFalsy();
      input.getUserInput();
      expect(state.strings.length).toBeTruthy();

      // ensure state.histograms is empty then populated
      expect(state.histograms.length).toBeFalsy()
      preprocessor.processAll();
      expect(state.histograms.length).toBeTruthy()
    })
  })
})