import { DotCalendar } from "./dot-calendar/DotCalendar";
import { ConfigLoader } from "./utils/config.loader";
import { v4 } from "uuid";
import { DotCalendarProperties } from "dot-calendar/DotCalendarProperties.type";
import { Colors } from "./utils/colors";
import { Utils } from "./utils/utils";

function renderFromConfig() {
  const configLoader = new ConfigLoader();
  const path = __dirname + "/../config";
  const configs = [
    "classic-white.json",
    "contemporary-and-bold.json",
    "cool-and-fresh.json",
    "artsy-and-creative.json",
    "cool-and-fresh-customized.json",
    "kawaii.json",
    "gray-champion.json",
  ];
  const flagPath = path + "/" + "flags-2024";
  const flagPathPrivate = path + "/" + "private-flags";

  configs.forEach((configFileName) => {
    const configFile = path + "/" + configFileName;
    const config = configLoader.readConfigWithFlags(
      configFile,
      flagPath,
      flagPathPrivate
    );
    const dotCalendar = new DotCalendar(config);
    dotCalendar.create().save(`/../../generated/${config.title}.png`);
  });
}

function renderWithColors(colorScheme: string[]) {
  let random = Utils.random(0, colorScheme.length);
  const weekendColor = colorScheme[random];
  colorScheme = colorScheme.filter((color) => color !== colorScheme[random]);

  random = Utils.random(0, colorScheme.length);
  const bgColor = colorScheme[random];
  colorScheme = colorScheme.filter((color) => color !== colorScheme[random]);

  random = Utils.random(0, colorScheme.length);
  const textColor = colorScheme[random];
  colorScheme = colorScheme.filter((color) => color !== colorScheme[random]);

  random = Utils.random(0, colorScheme.length);
  const dotStrikeColor = colorScheme[random];
  colorScheme = colorScheme.filter((color) => color !== colorScheme[random]);

  const prop: DotCalendarProperties = {
    title: v4(),
    year: 2023,
    language: "DE",
    weekendColor,
    general: {
      width: 4961,
      height: 3508,
      textDistance: 100,
      widthBuffer: 100,
      bgColor,
      textFont: "Helvetica",
      textColor,
    },
    dots: {
      distanceBetweenCirclesX: 5,
      distanceBetweenCirclesY: 5,
      columns: 3,
      dotStrikeColor,
      dotLineWidth: 10,
    },
  };
  const dotCalendar = new DotCalendar(prop);
  dotCalendar.create().save(`/../../generated/random/${prop.title}.png`);
}

function generateRandomCalendars(iterations: number) {
  let colors = Colors.colors;
  for (let i = 0; i < iterations; i++) {
    console.log(`running iteration ${i}`);
    const random = Utils.random(0, colors.length);
    if (colors[random]) {
      renderWithColors(colors[random]);
      colors = colors.filter((color) => color !== colors[random]);
    }
  }
}

renderFromConfig();
// generateRandomCalendars(100);
