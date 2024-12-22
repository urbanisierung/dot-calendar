const fs = require("fs");

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
        {
          month: 5,
          day: 30,
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

function create(options: { year: number }) {
  const FLAGS_DIR = `${CONFIG_DIR}/flags-${options.year}`;

  // write general flags
  let index = 0;
  for (const flag of general) {
    console.log(`Processing ${flag.title}`);
    const name = `bw_bank_holidays_${index++}.json`;
    const path = `${FLAGS_DIR}/${name}`;
    fs.writeFileSync(path, JSON.stringify(flag, null, 2));
  }

  for (const flag of config.bankHolidays) {
    console.log(`Processing ${flag.title}`);
    const name = `bw_bank_holidays_${index++}.json`;
    const path = `${FLAGS_DIR}/${name}`;
    fs.writeFileSync(path, JSON.stringify(flag, null, 2));
  }

  // write school holidays
  index = 0;
  for (const flag of config.holidays) {
    console.log(`Processing ${flag.title}`);
    const start = flag.range[0];
    const end = flag.range[1];
    let current = new Date(options.year, start.month - 1, start.day + 1);
    const endDay = new Date(options.year, end.month - 1, end.day);
    while (current.getTime() < endDay.getTime()) {
      flag.range.push({
        month: current.getMonth() + 1,
        day: current.getDate(),
      });
      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }
    const name = `bw_holidays_${index++}.json`;
    const path = `${FLAGS_DIR}/${name}`;
    fs.writeFileSync(path, JSON.stringify(flag, null, 2));
  }
}

create({ year: 2025 });
