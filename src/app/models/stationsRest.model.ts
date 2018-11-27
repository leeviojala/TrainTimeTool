export class StationRest {

    constructor(
         public passengerTraffic: string,
         public type: string,
         public stationName: string,
         public stationShortCode: string,
         public stationUICCode: string,
         public countryCode:  string,
         public longitude:  string,
         public latitude: string) { }

}
