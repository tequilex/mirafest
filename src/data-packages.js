const DATA_PACKAGES = [
      {
        id: 1,
        title: 'MAXI',
        description:"4 мастер-класса, 1 номинация под оркестр, 1 номинация под CD",
        price: 11000,
        exist: [{'мастер-классы:': 4}, {'номинации под оркестр:': 1}, {'номинации под сд:': 1}],
        
      },
      {
        id: 2,
        title: 'MIDI',
        description:"2 мастер-класса, 1 номинация под оркестр",
        price: 7000,
        exist: [{'мастер-классы:': 2}, {'номинации под оркестр:': 1}],
      },
      {
        id: 3,
        title: 'MINI',
        description:"1 мастер-класс, 1 номинация под CD",
        price: 4000,
        exist: [{'мастер-классы:': 1}, {'номинации под сд:': 1}],
      },
      {
        id: 4,
        title: 'KIDS',
        description:"1 мастер-класс, 1 номинация под CD",
        price: 3500,
        exist: [{'мастер-классы:': 1}, {'номинации под сд:': 1}],
      },
];

export default DATA_PACKAGES;