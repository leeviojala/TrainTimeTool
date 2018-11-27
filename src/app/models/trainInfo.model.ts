export class TrainInfo {

    constructor(
        public trainNumber: string,
        public startStation: string,
        public destinationStation: string,
        public canceled: boolean,
        public scheduledTime: string,
        public timeLate?: Date,
        public newTime?: string,

    ) { }

}