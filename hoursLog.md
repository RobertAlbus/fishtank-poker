# Hours Log
----------------
## 19 05 07

| HOURS | description |
|-------|-------------|
| 2.0 H | explore the problem-space |
| 2.0 H | create input module |
| 2.0 H | discover and implement architectural patterns |
|-------|  |
| 6.0H  | total |

### key take-aways
* this is not a poker game
* it is a poker themed puzzle
* key components
  * state machine
  * input
  * ??? algorithm ???
  * output

----------------

## 19 05 08
| HOURS | description |
|-------|-------------|
| 0.5 H | create state machine |
| 0.5 H | solidify program modules and architecture |
| 4.0 H | create preprocessing engine v1 |
| 0.5 H | creating types and aliases |
| 0.5 H | create preprocessing engine v2 |
| 2.0 H | begin hand comparator agorithm |
|-------| |
| 8.0 H | total |

### key take-aways
* modules need state machine via DI
* algorithm has 2 parts:
  * preprocessing: string => histogram
  * hand comparison
* data needs to transform from string into something useful
* types needed:
  * type: histogramItem and 
  * alias Histogram (histogramItem[])

----------------

## 19 05 09

| HOURS | description |
|-------|-------------|
| 1.5 H | bugfixes for preprocessor |
| 0.5 H | put together this log |
| 4.0 H | develop hand comparator algorithm |
| 0.5 H | implement output module |
| 1.5 H | bug fixes for hand comparator |
|-------| |
| 7.5 H | total |

### key take-aways
* when stuck on an algorithm:
  * what's our input?
  * what do we want for output?
  * what are the steps go from a => b?
* I am doing this the wrong way!
  * should generate a ranked table of all possible hands (sorted by card)
  * (13*4)^5 possible combinations 
  * ~760mb table size ( 2 bytes * 3.8e8 )
  * would enable easy lookup even with wildcards
----------------

## 19 05 10

| HOURS | description |
|-------|-------------|
| 2.0 H | jasmine (tests): installing/configuring/troubleshooting |
| 3.0 H | writing tests: input, preprocessor, state machine |
| 1.0 H | writing tests: output, preprocessor |
|-------| |
| 6.0 H | total |

### key take-aways
* should mock state machine for easier testing
  * create mock data
  * create mock state machine
  * should be able to load mock data into mock state easily

----------------
## 19 05 11

| HOURS | description |
|-------|-------------|
| 2.0 H | creating mock state machine and mock data for easier testing |
| 4.0 H | writing tests: output, input, preprocessor, hand comparator |
| 0.5 H | writing tests: output, input, preprocessor, hand comparator |
| 2.0 H | README |
|-------| |
| 8.5 H | total |

### key take-aways
* Mocking state machine and data was a good idea
  * easy to make mistakes with non-trivial sets of human-evaluated, hardcoded data
  * changes in assumtions during refactors led to mocked data being incorrect and causing tests to fail
  * updating mocked data made the tests pass again
* Output testing:
  * should test the output by stubbing console.log
----------------