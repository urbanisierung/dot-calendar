import * as cnvs from "canvas";
import * as fs from "fs";
import { I18N } from "../i18n/I18N";
import { DotCalendarProperties, DotFlag } from "./DotCalendarProperties.type";
import { Shape } from "../utils/shape";
import { DateUtils } from "../utils/date.utils";

export class DotCalendar {
  private canvas;
  private ctx;
  private width;
  private height;
  private properties: DotCalendarProperties;
  private i18n: I18N = new I18N();
  private dateUtils: DateUtils;
  private steps = 0;

  constructor(properties: DotCalendarProperties) {
    this.properties = properties;
    this.width = this.properties.general.width;
    this.height = this.properties.general.height;
    if (!properties.dots.dotFillColor) {
      this.properties.dots.dotFillColor = properties.general.bgColor;
    }
    this.i18n.load(this.properties.language);
    this.canvas = cnvs.createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
    Shape.setBackground(
      this.properties.general.bgColor,
      this.ctx,
      this.width,
      this.height
    );
    this.dateUtils = new DateUtils(this.properties, this.i18n);
  }

  public create(): DotCalendar {
    console.log(`rendering now ${this.properties.title}`);
    const distanceBetweenCirclesX = this.properties.dots
      .distanceBetweenCirclesX;
    const distanceBetweenCirclesY = this.properties.dots
      .distanceBetweenCirclesY;
    const textDistance = this.properties.general.textDistance;
    const columns = this.properties.dots.columns;
    const widthBuffer = this.properties.general.widthBuffer;

    const months = 12;
    const days = 31;
    const radius = Math.round(
      ((this.width - months * textDistance - 2 * widthBuffer) /
        (columns * months) -
        distanceBetweenCirclesX) /
        2
    );
    const dotWidth =
      columns * months * (radius * 2 + distanceBetweenCirclesX) +
      months * textDistance -
      textDistance;
    const dotHeight = days * (radius * 2 + distanceBetweenCirclesY);

    const startX = (this.width - dotWidth) / 2 + radius;
    const startY = (this.height - dotHeight) / 2 + radius;

    const steps = months * days * columns;
    let index = 0;

    for (let month = 0; month < months; month++) {
      const currentMonth = month + 1;
      const maxDaysInMonth = this.dateUtils.getMaxDaysInMonth(currentMonth);
      for (let day = 0; day < maxDaysInMonth; day++) {
        const currentDay = day + 1;
        for (let column = 0; column < columns; column++) {
          const x =
            startX +
            (month * textDistance +
              month * columns * (radius * 2 + distanceBetweenCirclesX) +
              column * (radius * 2 + distanceBetweenCirclesX));
          const y = startY + day * (radius * 2 + distanceBetweenCirclesY);

          this.drawDot(currentMonth, currentDay, column, x, y, radius);

          if (month === 0 && day === 30 && column === 0) {
            this.drawYearTitle(x, y, radius);
          }

          if (day === 0 && column === 0) {
            this.drawMonthTitle(currentMonth, x, y, radius);
          }

          if (column === 0) {
            this.drawDayTitle(currentMonth, currentDay, x, y, radius);
          }

          index++;
          this.showProgress(index);
        }
      }
    }
    return this;
  }

  private drawDayTitle(
    currentMonth: number,
    currentDay: number,
    x: number,
    y: number,
    radius: number
  ) {
    const textDistance = this.properties.general.textDistance;
    const dayOfWeek = this.dateUtils.getDayOfWeek(currentMonth, currentDay);
    const flagWeekend =
      this.properties.weekendColor && [0, 6].includes(dayOfWeek);
    this.ctx.fillStyle = flagWeekend
      ? this.properties.weekendColor
      : this.properties.general.textColor;
    this.ctx.font = `${0.8 * radius}px ${this.properties.general.textFont}`;
    const dayTitle = currentDay < 10 ? `0${currentDay}` : currentDay;
    this.ctx.fillText(
      dayTitle,
      x - radius - (textDistance - textDistance / 3),
      y - radius / 3
    );
    this.ctx.font = `16px ${this.properties.general.textFont}`;
    const daySubTitle = this.dateUtils.getDayOfWeekName(
      currentMonth,
      currentDay
    );
    this.ctx.fillText(
      daySubTitle,
      x - radius - (textDistance - textDistance / 3),
      y + radius / 3
    );
  }

  private drawMonthTitle(
    currentMonth: number,
    x: number,
    y: number,
    radius: number
  ) {
    this.ctx.fillStyle = this.properties.general.textColor;
    this.ctx.font = `${radius}px ${this.properties.general.textFont}`;
    const monthName = this.i18n
      .get(this.properties.language)
      .months.get(currentMonth);
    this.ctx.fillText(monthName, x - radius, y - radius * 2);
  }

  private drawYearTitle(x: number, y: number, radius: number) {
    this.ctx.fillStyle = this.properties.general.textColor;
    this.ctx.font = `${2 * radius}px ${this.properties.general.textFont}`;
    this.ctx.fillText(this.properties.year, x - radius, y + radius * 3.5);
  }

  private drawDot(
    month: number,
    day: number,
    column: number,
    x: number,
    y: number,
    radius: number
  ) {
    const dotFlag = this.getDotFlag(month, day, column);
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.properties.dots.dotStrikeColor;
    this.ctx.lineWidth = this.properties.dots.dotLineWidth;
    this.ctx.fillStyle = this.getFillColor(dotFlag);
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.drawDotTitle(x, y, radius, dotFlag);
  }

  private drawDotTitle(x: number, y: number, radius: number, dotFlag: DotFlag) {
    if (dotFlag && dotFlag.showTitle) {
      this.ctx.fillStyle = this.properties.general.bgColor;
      const fontSize =
        dotFlag.title.length <= 3
          ? radius * 0.7
          : (radius / dotFlag.title.length) * 2.5;
      this.ctx.font = `${fontSize}px ${this.properties.general.textFont}`;
      this.ctx.textAlign = "center";
      const titleX = x;
      const titleY = dotFlag.title.length <= 3 ? y + fontSize / 3 : y;
      this.ctx.fillText(dotFlag.title, titleX, titleY);
      this.ctx.textAlign = "left";
    }
  }

  private getDotFlag(month: number, day: number, column: number) {
    if (this.properties.flags) {
      const dotFlag = this.properties.flags.find(
        flag =>
          flag.column === column &&
          flag.range.find(r => r.month === month && r.day === day)
      );
      return dotFlag;
    }
    return undefined;
  }

  private getFillColor(dotFlag: DotFlag) {
    const color = dotFlag
      ? this.getColorOfType(dotFlag.type)
      : this.properties.dots.dotFillColor;
    // let color = this.properties.dots.dotFillColor;
    // if (this.properties.flags) {
    //   const dotFlag = this.properties.flags.find(
    //     flag =>
    //       flag.column === column &&
    //       flag.range.find(r => r.month === month && r.day === day)
    //   );
    //   color = dotFlag ? this.getColorOfType(dotFlag.type) : color;
    // }
    return color;
  }

  private getColorOfType(type: string): string {
    const foundType = this.properties.flagTypes.find(
      flagType => flagType.type === type
    );
    return foundType.color;
  }

  private progress = 0;
  private showProgress(index) {
    if (this.steps === 0) {
      for (let month = 1; month <= 12; month++) {
        this.steps +=
          this.dateUtils.getMaxDaysInMonth(month) *
          this.properties.dots.columns;
      }
    }
    const current = Math.floor((index / this.steps) * 100);
    if (current > this.progress + 10) {
      this.progress = current;
      console.log(this.progress + "%");
    }
  }

  public save(outputFile) {
    const out = fs.createWriteStream(__dirname + outputFile);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () =>
      console.log(`PNG for ${this.properties.title} created: ${outputFile}`)
    );
  }
}
