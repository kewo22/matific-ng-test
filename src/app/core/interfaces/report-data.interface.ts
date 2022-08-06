import { ActivityData } from "./activity-data.interface";

export interface ReportData {
    dateCompleted: Date;
    content: string;
    type: string;
    skill: string;
    result: number;
    timeSpent: string;
    payload: ActivityData;
}