import { Histogram, HistogramItem } from '../types/histogram';
import { handEnum, handEnum as hand } from '../types/hand.enum';

export const strings: string[] = [

  ////////
  // 2 hands
  ////////

  // tie by hand rank
  // winner determined with histogram analysis
  '24578 2578A', //0 HIGHCARD     | b
  '22456 33678', //1 PAIR         | b
  '22449 44339', //2 TWOPAIR      | b
  '444JK 666JK', //3 THREEOFAKIND | b
  'A2345 TJQKA', //4 STRAIGHT     | b
  '33322 333AA', //5 FULLHOUSE    | b
  '99995 44445', //6 FOUROFAKIND  | a

  // win by hand rank
  // histogram analysis not required
  '44333 45567', //7 FULLHOUSE  PAIR      | a
  '99865 A2345', //8 PAIR       STRAIGHT  | b

  // tie by hand rank
  // tie by histogram analysis
  '33445 33445', //9 TWOPAIR     TWOPAIR   | ab

  ////////
  // >2 hands
  ////////

  // win by hand rank
  // histogram analysis not required
  'AAAQK 24567 22984',        //10 THREEOFAKIND HIGHCARD PAIR           | a

  // tie by hand rank
  // winner determined with histogram analysis
  'AAAQK JJJQK 22984',        //11 THREEOFAKIND THREEOFAKIND TWOPAIR    | a

  // tie by hand rank
  // tie by histogram analysis
  'A2346 A2346 A2346 A2346',  //12 HICHCARD HICHCARD HICHCARD HICHCARD  | abcd
  
  // cheater
  'KKKKK AAAAA'               //13 CHEATER CHEATER                      | b
];

export const histograms: Histogram[][] = [

  [ //0 "24578 2578A"
    [ new HistogramItem(8, 1), new HistogramItem(7, 1), new HistogramItem(5, 1), new HistogramItem(4, 1), new HistogramItem(2, 1)],
    [ new HistogramItem(14, 1), new HistogramItem(8, 1), new HistogramItem(7, 1), new HistogramItem(5, 1), new HistogramItem(2, 1)]
  ],
  [ //1 "22456 33678"
    [ new HistogramItem(2, 2), new HistogramItem(6, 1), new HistogramItem(5, 1), new HistogramItem(4, 1)],
    [ new HistogramItem(3, 2), new HistogramItem(8, 1), new HistogramItem(7, 1), new HistogramItem(6, 1)]
  ],
  [ //2 "22449 44339"
    [ new HistogramItem(4, 2), new HistogramItem(2, 2), new HistogramItem(9, 1)],
    [ new HistogramItem(4, 2), new HistogramItem(3, 2), new HistogramItem(9, 1)]
  ],
  [ //3 "444JK 666JK"
    [ new HistogramItem(4, 3), new HistogramItem(13, 1), new HistogramItem(11, 1)],
    [ new HistogramItem(6, 3), new HistogramItem(13, 1), new HistogramItem(11, 1)]
  ],
  [ //4 "A2345 TJQKA"
    [ new HistogramItem(5, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1), new HistogramItem(1, 1)],
    [ new HistogramItem(14, 1), new HistogramItem(13, 1), new HistogramItem(12, 1), new HistogramItem(11, 1), new HistogramItem(10, 1)]
  ],
  [ //5 "33322 333AA"
    [ new HistogramItem(3, 3), new HistogramItem(2, 2)],
    [ new HistogramItem(3, 3), new HistogramItem(14, 2)]
  ],
  [ //6 "99995 44445"
    [ new HistogramItem(9, 4), new HistogramItem(5, 1)],
    [ new HistogramItem(4, 4), new HistogramItem(5, 1)]
  ],
  [ //7 "44333 45567"
    [ new HistogramItem(3, 3), new HistogramItem(4, 2)],
    [ new HistogramItem(5, 2), new HistogramItem(7, 1), new HistogramItem(6, 1), new HistogramItem(4, 1)]
  ],
  [ //8 "99865 A2345"
    [ new HistogramItem(9, 2), new HistogramItem(8, 1), new HistogramItem(6, 1), new HistogramItem(5, 1)],
    [ new HistogramItem(5, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1), new HistogramItem(1, 1) ]
  ],
  [ //9 "33445 33445"
    [ new HistogramItem(4, 2), new HistogramItem(3, 2), new HistogramItem(5, 1)],
    [ new HistogramItem(4, 2), new HistogramItem(3, 2), new HistogramItem(5, 1)]
  ],
  [ //10 "AAAQK 24567 22984"
    [ new HistogramItem(14, 3), new HistogramItem(13, 1), new HistogramItem(12, 1)],
    [ new HistogramItem(7, 1), new HistogramItem(6, 1), new HistogramItem(5, 1), new HistogramItem(4, 1), new HistogramItem(2, 1)],
    [ new HistogramItem(2, 2), new HistogramItem(9, 1), new HistogramItem(8, 1), new HistogramItem(4, 1)]
  ],
  [ //11 "AAAQK JJJQK 22984"
    [ new HistogramItem(14, 3), new HistogramItem(13, 1), new HistogramItem(12, 1)],
    [ new HistogramItem(11, 3), new HistogramItem(13, 1), new HistogramItem(12, 1)],
    [ new HistogramItem(2, 2), new HistogramItem(9, 1), new HistogramItem(8, 1), new HistogramItem(4, 1)]
  ],
  [ //12 "A2346 A2346 A2346 A2346"
    [new HistogramItem(14, 1), new HistogramItem(6, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1)],
    [new HistogramItem(14, 1), new HistogramItem(6, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1)],
    [new HistogramItem(14, 1), new HistogramItem(6, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1)],
    [new HistogramItem(14, 1), new HistogramItem(6, 1), new HistogramItem(4, 1), new HistogramItem(3, 1), new HistogramItem(2, 1)],
  ],
  [ //13 "KKKKK AAAAA"
    [new HistogramItem(13, 5)],
    [new HistogramItem(14, 5)]
  ]
];

export const enums: handEnum[][] =
[

  [hand.HIGHCARD,     hand.HIGHCARD],     //0 "24578 2578A"
  [hand.PAIR,         hand.PAIR],         //1 "22456 33678"
  [hand.TWOPAIR,      hand.TWOPAIR],      //2 "22449 44339"
  [hand.THREEOFAKIND, hand.THREEOFAKIND], //3 "444JK 666JK"
  [hand.STRAIGHT,     hand.STRAIGHT],     //4 "A2345 TJQKA"
  [hand.FULLHOUSE,    hand.FULLHOUSE],    //5 "33322 333AA"
  [hand.FOUROFAKIND,  hand.FOUROFAKIND],  //6 "99995 44445"
  [hand.FULLHOUSE,    hand.PAIR],         //7 "44333 45567"
  [hand.PAIR,         hand.STRAIGHT],     //8 "99865 A2345"
  [hand.TWOPAIR,      hand.TWOPAIR],      //9 "33445 33445"

  [hand.THREEOFAKIND, hand.HIGHCARD,      hand.PAIR],                     //10 "AAAQK 24567 22984"
  [hand.THREEOFAKIND, hand.THREEOFAKIND,  hand.PAIR],                     //11 "AAAQK JJJQK 22984"
  [hand.HIGHCARD,     hand.HIGHCARD,      hand.HIGHCARD,  hand.HIGHCARD], //12 "A2346 A2346 A2346 A2346"
  [hand.CHEATER,      hand.CHEATER]                                       //13 "KKKKK AAAAA"
];

export const winnerStrings: string[] = [

  'b',    //0  "24578 2578A"
  'b',    //1  "22456 33678"
  'b',    //2  "22449 44339"
  'b',    //3  "444JK 666JK"
  'b',    //4  "A2345 TJQKA"
  'b',    //5  "33322 333AA"
  'a',    //6  "99995 44445"
  'a',    //7  "44333 45567"
  'b',    //8  "99865 A2345"
  'ab',   //9  "33445 33445"
  'a',    //10 "AAAQK 24567 22984"
  'a',    //11 "AAAQK JJJQK 22984"
  'abcd', //12 "A2346 A2346 A2346 A2346"
  "b"     //13 "KKKKK AAAAA"
];
