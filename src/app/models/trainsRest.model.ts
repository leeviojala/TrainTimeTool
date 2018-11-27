import { TimeTableRows } from './timeTableRows.model';

export class TrainsRest {

    constructor(
        public trainNumber: string,
        public departureDate: string,
        public operatorUICCode: string,
        public operatorShortCode: string,
        public trainType: string,
        public trainCategory: string,
        public commuterLineID: string,
        public runningCurrently: string,
        public cancelled: string,
        public version: string,
        public timetableType: string,
        public timetableAcceptanceDate: string,
        public timeTableRows: TimeTableRows) { }

}
