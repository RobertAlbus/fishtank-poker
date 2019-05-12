# Poker Hand Evaluator
Programming challenge for [Fish Tank Consulting](https://getfishtank.ca/)

How to use:
1. `git clone https://github.com/RobertAlbus/fishtank-poker.git`
2. `cd fishtank-poker`
3. `npm i`
4. `npm start`
5. `npm test` (optional)

Dependencies
* 

--------
## Document outline
* Challenge
* Results Overview
* Application Architecture
* Algorithms Overview
* Deficiency List
* Alternate Solutions
* Summary

--------
## Challenge

Given two poker hands from a modified deck of cards that does not include suits:
* determine the rank of each hand
* which hand would win

### Details
When both hands contain a pair, two pair, three of a kind or four of a kind of the same value (this may occur due to the presence of wildcards) then the winning hand is determined by the value of the next highest card in the hand.  If in this case, both hands contain the same high card the hand is a tie.  Ties will also occur if both hands have the same straight.  Aces can be high (ranked higher than a King) or low (ranked lower than a 2).Tens are represented by a 'T', Jacks are 'J', Queens are 'Q', Kings are 'K' and Aces are 'A'.  All other cards are simply their numerical value, i.e. 2,3,4,5 except for a * which is a wild card.

The possible hands are in order of ranking from lowest to highest are:
* HIGHCARD (if you don't have anything else the highest card in your hand, A2467)
* PAIR (any two cards of same value, AA234)
* TWOPAIR (two pairs, AA223)
* THREEOFAKIND (any three cards of same value, KKK23)
* STRAIGHT (five cards in order, 23456)
* FULLHOUSE (a pair and three of a kind, AAKKK)
* FOUROFAKIND (four cards of same value, AAAA2)

The program must read from STDIN and write to STDOUT
This problem is evaluated based on an elegant program design as well as the quality and coverage of the unit tests you supply.

### Input Format

* The first line contains an integer, n, the number of pairs of poker hands to evaluate.
* The next n lines each contain two space-separated strings, a and b, representing poker hands.

### Constraints

1 <= n <= 10^5

L = { "*23456789TJQKA"^5 }a, b ∈ L

### Output Format

For each pair of hands, a space separated string containing the rank of hand a, the rank of hand b, and the winning hand.  The winning hand is represented by the letter a, b or, in the case of a tie, the letters a and b.

Sample Input
* 6
* AAKKK 23456
* KA225 33A47
* AA225 44465
* TT4A2 TTA89
* A345* 254*6
* QQ2AT QQT2J

Sample Output
* FULLHOUSE
* STRAIGHT a
* PAIR
* PAIR b
* TWOPAIR THREEOFAKIND a
* PAIR PAIR ab
* STRAIGHT STRAIGHT b
* PAIR PAIR a

--------
## Project Overview
Implmentation parses hands into histograms and makes decisions based on those histograms.

### Time Breakdown
[time log](./hoursLog.md)

| TASK            | HOURS  |
|:----------------|-------:|
| Exploration     |  2.0 H |
| Architecture    |  2.5 H |
| Implementation  | 16.5 H |
| Testing         | 12.5 H |
| Wrap-up         |  2.5 H |
|                 |        |
| Total           | 36.5 H |

### Requirements
- [x] Correct output in all cases
- [x] Test suite for all public APIs, utilizing mock services and data
- [x] Edge case: Aces-low straight 1-5
- [x] Simple architecture
- [x] Can evaluate 1 or more hands
- [x] Short-circuit evaluation (improved efficiency)
- [ ]  Accounts for wildcard *

--------
## Application Architecture
| Component       | DI            |
|:----------------|:--------------|
| State Machine   |               |
| Input Service   | State Machine |
| Preprocessor    | State Machine |
| Hand Comparator | State Machine |
| Output Service  | State Machine |

### Program Flow
1. Get input
2. Save input to state machine
3. Preprocess input strings into useful format
4. Evaluate winners
5. Save winners to state machine
6. Output winners

--------
## Algorithms Overview

### Preprocessor
Input Strings => Histograms

[preprocessor algorithm example](./preprocessor/preprocessor.md)

1. input string 
2. discreet hands
3. discreet cards
4. numeric representation of cards
5. histogram
6. sorted descending histogram 
  
  a. primary sort: card frequency
  
  b. secondary sort: card value
  
7. Catch edge case: low-ace straight 1-5

### Hand comparator
Histograms => Winners
1. sorted histogram
2. histogram signature

    41  => four of a kind

    32  => full house

    311 => three of a kind

    221 => two pair

    211 => pair

    11111 && histogram[0] - histogram[4] === 4 => straight

    11111 => high card

    default => cheater

3. hand-rank Enum
4. compare enums

    if 1 winner by hand-rank => short circuit to 6 with winner

    if hand-rank tie => histogram comparison

5. histogram comparison

    top-down comparison of histograms

    filter out hands that are not tied

    filter hands for highest card-value for histogram\[i]

    recurse until 1 contender left or histograms are entirely identical

6. return winners index position(s)
7. convert index-position to letter
8. push letter to state.winnerStrings

### Output
1. return state.handEnum\[i] + " " + state.winnerString[i]


--------
## Deficiency List

### Does not accept wildcards *
It would be possible to account for wildcards in a subsequent version.

Solution A:
* Generate all possible hands given this quantity of wildcards
* Evaluate best hand of this set
* Select this hand to carry forward for comparison against other players
* The time complexity would be terrible: 13^n where n = number of wildcards

Solution B:
* Evaluate histogram signature, including wildcards
* if ( n wildcards && this histogram signature) => best possible hand = some hand
* Just one big switch
* time complexity would be linear (I think)

--------
## Alternate Solution

1. Populate a sorted list of all possible sorted hands
2. Sort input hands
3. Find index of each sorted input hand
4. Compare the indexes of hands, best index wins or tie

How to find index of a given hand:
1. Compare hand\[card] to table\[i]\[card]

    Hit  : Compare hand\[card+1] to table\[i]\[card+1]

    Miss : Compare hand\[card] to table\[i+1]\[card]

2. See 1.

--------
## Summary

### Challenge
Determine winning hand for a round of suitless poker.

For input
`23456 3452A`
Give output
`STRAIGHT STRAIGHT b`

### Results Overview
Requirements met:
* Should determine winner
* Elegant architecture
* Test suite
* Account for aces-low

Requirements missed:
* Should account for wildcard * input

Requirements exceeded:
* Can compare more than 2 hands per round

### Application Architecture

Input => Preprocess => Hand Comparator => Output

All services share State Machine via dependency injection

### Algorithms Overview
Preprocess: 
1. Round of poker   => discreet hands
2. Hand             => discreet cards
3. Cards            => numeric values
4. Numeric values   => histogram {card value, card frequency}
5. Histogram        => sorted histogram
6. Sorted histogram => catch edge case: low-ace

Hand Comparator:
1. Histogram => histogram signature
2. Compare signatures

    short circuit if obvious winner by histogram signature

3. Compare histogram\[i]

    filter out contenders until 1 contender left OR histograms are identical
    
4. Determine winner-letter from original index position of the winner(s)

### Deficiency List
No wildcard support

### Alternate Solutions
1. Lookup-based
2. Sorted table of all possible sorted hands
3. Compare indexes

--------
