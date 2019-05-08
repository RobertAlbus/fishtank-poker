from string

    '22345 TTTKA'

into hands
stringsToHands() {...}

    [ '22345', 'TTTKA' ],


into hands with discreet cards
handsToCards() {...}

    [ [2, 2, 3, 4, 5], [T, T, T, K, A] ]

into cards by numeric value
cardsToNumeric() {...}

    [ [2, 2, 3, 4, 5], [10, 10, 10, 13, 14] ], 

into histograms
numericToHistograms() {...}

    [
        { value: 2, quantity: 2},
        { value: 3, quantity: 1},
        { value: 4, quantity: 1},
        { value: 5, quantity: 1}
    ],
    [
        { value: 10, quantity: 3},
        { value: 13, quantity: 1},
        { value: 14, quantity: 1},
    ]
