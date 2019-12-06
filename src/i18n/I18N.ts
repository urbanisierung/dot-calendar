import { I18NTypes } from "./i18n.type";

const fs = require("fs");

export interface Store {
  days: Map<number, string>;
  months: Map<number, string>;
}

export class I18N {
  private stores: Map<string, Store> = new Map();

  public load(language: string) {
    const rawdata = fs.readFileSync(`${__dirname}/${language}.json`);
    const data: I18NTypes = JSON.parse(rawdata);
    const days = new Map();
    days.set(0, data.days.sunday);
    days.set(1, data.days.monday);
    days.set(2, data.days.tuesday);
    days.set(3, data.days.wednesday);
    days.set(4, data.days.thursday);
    days.set(5, data.days.friday);
    days.set(6, data.days.saturday);
    const months = new Map();
    months.set(1, data.months.january);
    months.set(2, data.months.february);
    months.set(3, data.months.march);
    months.set(4, data.months.april);
    months.set(5, data.months.may);
    months.set(6, data.months.june);
    months.set(7, data.months.july);
    months.set(8, data.months.august);
    months.set(9, data.months.september);
    months.set(10, data.months.october);
    months.set(11, data.months.november);
    months.set(12, data.months.december);
    const store: Store = {
      days,
      months
    };
    this.stores.set(language, store);
  }

  public get(language: string): Store {
    return this.stores.get(language);
  }
}
