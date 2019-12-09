export interface DotCalendarProperties {
  title: string;
  year: number;
  language: string;
  weekendColor?: string,
  general: {
    width: number;
    height: number;
    widthBuffer: number;
    textDistance: number;
    bgColor: string;
    textFont: string;
    textColor: string;
  };
  dots: {
    distanceBetweenCirclesX: number;
    distanceBetweenCirclesY: number;
    columns: number;
    dotStrikeColor: string;
    dotLineWidth: number;
    dotFillColor?: string;
  };
  flagTypes?: DotFlagType[],
  flags?: DotFlag[];
}

export interface DotFlag {
  title: string;
  showTitle?: boolean;
  column: number;
  type: string;
  range: DotDate[];
}

export interface DotDate {
  month: number;
  day: number;
}

export interface DotFlagType {
  type: string;
  color: string;
}