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
  * 13^5 possible combinations
  * would enable easy lookup even with wildcards