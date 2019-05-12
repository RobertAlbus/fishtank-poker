# Poker Hand Evaluator
Programming challenge for [Fish Tank Consulting](https://getfishtank.ca/)

--------
## Document outline
* Challenge
* Results Overview
* Application Architecture
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
## Results Overview

--------
## Application Architecture

--------
## Deficiency List

--------
## Alternate Solutions

--------
## Summary