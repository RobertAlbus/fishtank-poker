import { StateMachine } from "../state-module/state-machine";
import { Preprocessor } from "./preprocessor_v2";
import { InputServiceMock as InputService } from "../ui-module/input.mock";
import { Histogram, HistogramItem } from "../types/histogram";

describe('Preprocessor', () => {

  let state = new StateMachine;
  let preprocessor = new Preprocessor(state);

  it('should create', () => {
    expect(preprocessor).toBeTruthy();
  })

  describe('string to histogram public API', () => {

    let strings: string[] = ["222TT 2345A", "3333Q T9TTJ"]

    it('should convert string to the correct set of histograms', () => {
      let histograms: Histogram[] = preprocessor.stringToHistograms(strings[0])
      
      expect(histograms.length).toBeTruthy();
      expect(histograms[0]).toEqual([
        new HistogramItem(2,3),
        new HistogramItem(10,2)
      ]);
      expect(histograms[1]).toEqual([
        new HistogramItem(14,1),
        new HistogramItem(5,1),
        new HistogramItem(4,1),
        new HistogramItem(3,1),
        new HistogramItem(2,1)
      ]);
    });

    it('should convert string[] to Histogram[][]', () => {

      let results: Histogram[][] = preprocessor.batchStringToHistograms(strings)
      expect(results.length).toEqual(2)
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