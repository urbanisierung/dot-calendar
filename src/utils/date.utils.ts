import { I18N } from "../i18n/I18N";
import { DotCalendarProperties } from "../dot-calendar/DotCalendarProperties.type";

export class DateUtils {
  constructor(private properties: DotCalendarProperties, private i18n: I18N) {}

  public getDayOfWeekName(month: number, day: number): string {
    return this.i18n
      .get(this.properties.language)
      .days.get(this.getDayOfWeek(month, day));
  }

  public getDayOfWeek(month: number, day: number): number {
    const monthString = month < 10 ? `0${month}` : month;
    const dayString = day < 10 ? `0${day}` : day;
    const dateString = `${this.properties.year}-${monthString}-${dayString}T00:00:00`;
    const dayOfWeek = new Date(dateString).getDay();
    return dayOfWeek;
  }

  public getMaxDaysInMonth(month: number): number {
    return new Date(this.properties.year, month, 0).getDate();
  }
}
