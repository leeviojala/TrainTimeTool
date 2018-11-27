export class TimeTableRows {

    constructor(
        public stationShortCode: string,
        public stationUICCode: string,
        public countryCode: string,
        public type: string,
        public trainStopping: string,
        public commercialStop: string,
        public commercialTrack: string,
        public cancelled: string,
        public scheduledTime: Date,
        public actualTime: Date,
        public differenceInMinutes: String,
        public causes: string[],
        public trainReady?: any ) { }

}