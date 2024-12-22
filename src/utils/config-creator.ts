const ROOT = `${__dirname}/../..`;
const CONFIG_DIR = `${ROOT}/config`;

const general = [
  {
    title: "1. Weihnachtsfeiertag",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 12,
        day: 25,
      },
    ],
  },
  {
    title: "2. Weihnachtsfeiertag",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 12,
        day: 26,
      },
    ],
  },
  {
    title: "Allerheiligen",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 11,
        day: 1,
      },
    ],
  },

  {
    title: "Heilige 3 Könige",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 1,
        day: 6,
      },
    ],
  },
  {
    title: "Neujahr",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 1,
        day: 1,
      },
    ],
  },
  {
    title: "Tag der Arbeit",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 5,
        day: 1,
      },
    ],
  },
  {
    title: "Tag der Deutschen Einheit",
    column: 2,
    type: "bank-holiday",
    range: [
      {
        month: 10,
        day: 3,
      },
    ],
  },
];

const config = {
  bankHolidays: [
    {
      title: "Christi Himmelfahrt",
      column: 2,
      type: "bank-holiday",
      range: [
        {
          month: 5,
          day: 29,
        },
      ],
    },
    {
      title: "Fronleichnam",
      column: 2,
      type: "bank-holiday",
      range: [
        {
          month: 6,
          day: 19,
        },
      ],
    },
    {
      title: "Karfreitag",
      column: 2,
      type: "bank-holiday",
      range: [
        {
          month: 4,
          day: 18,
        },
      ],
    },
    {
      title: "Ostermontag",
      column: 2,
      type: "bank-holiday",
      range: [
        {
          month: 4,
          day: 21,
        },
      ],
    },
    {
      title: "Pfingstmontag",
      column: 2,
      type: "bank-holiday",
      range: [
        {
          month: 6,
          day: 9,
        },
      ],
    },
  ],
  holidays: [
    {
      title: "Herbstferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 10,
          day: 27,
        },
        {
          month: 10,
          day: 30,
        },
      ],
    },
    {
      title: "Bewegliche Ferientage",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 3,
          day: 1,
        },
        {
          month: 3,
          day: 8,
        },
      ],
    },
    {
      title: "Weihnachtsferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 12,
          day: 22,
        },
        {
          month: 12,
          day: 31,
        },
      ],
    },
    {
      title: "Weihnachtsferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 1,
          day: 1,
        },
        {
          month: 1,
          day: 5,
        },
      ],
    },
    {
      title: "Osterferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 4,
          day: 12,
        },
        {
          month: 4,
          day: 26,
        },
      ],
    },
    {
      title: "Pfingstferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 6,
          day: 7,
        },
        {
          month: 6,
          day: 21,
        },
      ],
    },
    {
      title: "Sommerferien",
      column: 2,
      type: "school-holiday",
      range: [
        {
          month: 7,
          day: 31,
        },
        {
          month: 9,
          day: 13,
        },
      ],
    },
  ],
};
