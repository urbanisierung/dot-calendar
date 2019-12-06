import {
  DotCalendarProperties,
  DotFlag
} from "dot-calendar/DotCalendarProperties.type";

const fs = require("fs");

export class ConfigLoader {
  public readConfig(path: string): DotCalendarProperties {
    const rawconfig = fs.readFileSync(path);
    const config: DotCalendarProperties = JSON.parse(rawconfig);
    return config;
  }

  public readFlag(path: string): DotFlag {
    const rawflag = fs.readFileSync(path);
    const flag: DotFlag = JSON.parse(rawflag);
    return flag;
  }

  public readConfigWithFlags(
    configFilePath: string,
    ...flagPaths
  ): DotCalendarProperties {
    const config = this.readConfig(configFilePath);
    const flags = this.readFlags(...flagPaths);
    config.flags = flags;
    return config;
  }

  public readFlags(...flagPaths): DotFlag[] {
    const flags: DotFlag[] = [];
    flagPaths.forEach(flagPath => {
      const flagFiles: string[] = this.readFlagFiles(flagPath);
      flagFiles.forEach(flagFile => {
        const flag = this.readFlag(flagPath + "/" + flagFile);
        flags.push(flag);
      });
    });
    return flags;
  }

  private readFlagFiles(path: string): string[] {
    const flags: string[] = fs
      .readdirSync(path)
      .filter(file => file.includes(".flag.json"));
    return flags;
  }
}
