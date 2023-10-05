import { DayUnit } from "./dayUnit";

export interface TimeLines extends Array<DayUnit> {
    daily: DayUnit[];
}