export interface FiveDaysForecasts {
    Headline: Headline;
    DailyForecasts: DailyForecasts[];
}

export interface DailyForecasts {
    Date: Date;
    EpochDate: number;
    Temperature: Temperature;
    Day: Day;
    Night: Night;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface Minimum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Maximum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Temperature {
    Minimum: Minimum;
    Maximum: Maximum;
}

export interface Day {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

export interface Night {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

export interface Headline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate?: any;
    EndEpochDate?: any;
    MobileLink: string;
    Link: string;
}


