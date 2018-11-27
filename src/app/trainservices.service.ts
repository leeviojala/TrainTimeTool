import { Injectable } from '@angular/core';
import { Station } from './models/station.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StationRest } from './models/stationsRest.model';
import { map } from 'rxjs/operators';
import { TrainsRest } from './models/trainsRest.model';
import { TrainInfo } from './models/trainInfo.model';
import { format } from 'path';

@Injectable({
  providedIn: 'root'
})
export class TrainservicesService {
 // tslint:disable-next-line:max-line-length
 private baseUrl = 'https://rata.digitraffic.fi/api/v1/live-trains/station/' 
 private trainsDepartureUrl2 = '?arrived_trains=0&arriving_trains=0&departed_trains=1&departing_trains=5&minutes_before_departure=300&minutes_after_departure=2&minutes_before_arrival=0&minutes_after_arrival=0&include_nonstopping=false';
 private trainsArrivalUrl2 = '?arrived_trains=5&arriving_trains=5&departed_trains=0&departing_trains=0&minutes_before_departure=0&minutes_after_departure=0&minutes_before_arrival=300&minutes_after_arrival=2&include_nonstopping=false';
  constructor(
    private http: HttpClient
  ) { }

  public getStations(): Observable<Station[]> {
    return this.getStationsFromRest();
  }
  public getStationsFromRest(): Observable<Station[]> {
    return this.http.get('https://rata.digitraffic.fi/api/v1/metadata/stations')
      .pipe(map((response: StationRest[]) => response.map(dto => this.adaptStation(dto))));
  }

  public adaptStation(dto: StationRest) {
    return new Station(
      dto.stationName.toLocaleLowerCase(),
      dto.stationShortCode
    );
  }

  public getTrainDetail(trainNumber: string) {

  }
/*  public getTrainDetailFromRest() {
    return this.http.get(this.trainsUrl)
      .pipe(map((response: any[]) => response.map(dto => this.adaptTrain(dto))));
  }*/
  public getDepartureTrains(code: string): Observable<TrainInfo[]> {
    return this.getDepartureTrainsFromRest(code);
  }
  public getDepartureTrainsFromRest(code: string) {
    return this.http.get(this.baseUrl + code + this.trainsDepartureUrl2)
      .pipe(map((response: any[]) => response.map(dto => this.adaptTrainDeparture(dto, code))));
  }

  public getArrivingTrains(code: string): Observable<TrainInfo[]> {
    return this.getArrivingTrainsFromRest(code);
  }

  public getArrivingTrainsFromRest(code: string) {
    return this.http.get(this.baseUrl + code + this.trainsArrivalUrl2)
      .pipe(map((response: any[]) => response.map(dto => this.adaptTrainArrival(dto, code))));
  }
  public makeDatePretty(formattedDate: Date) {
    const hours = (formattedDate.getHours() < 10 )? '0' + formattedDate.getHours() : formattedDate.getHours();
    const minutes  = (formattedDate.getMinutes() < 10)? '0' + formattedDate.getMinutes() : formattedDate.getMinutes();
    return hours  + ':' + minutes
  }

  public adaptTrainArrival(dto: any, code: string) {
    const startStation: string = dto.timeTableRows[0].stationShortCode;
    const destination:string = dto.timeTableRows[dto.timeTableRows.length -1].stationShortCode;
    const infoObject = dto.timeTableRows.find(a => a.stationShortCode = code && a.type === 'ARRIVAL');
    const formattedDate = new Date(infoObject.scheduledTime);
    formattedDate.setMinutes(formattedDate.getMinutes() + infoObject.differenceInMinutes);
    const scheduledTime = this.makeDatePretty(new Date(infoObject.scheduledTime));
    const displayDate = this.makeDatePretty(formattedDate);
    console.log(startStation);
    return new TrainInfo(
      dto.trainType + ' ' +dto.trainNumber,
      startStation,
      destination, 
      infoObject.cancelled,
      scheduledTime,
      infoObject.differenceInMinutes,
      
      displayDate,
      );
  }

  public adaptTrainDeparture(dto: any, code: string) {
    const startStation: string = dto.timeTableRows[0].stationShortCode;
    const destination:string = dto.timeTableRows[dto.timeTableRows.length -1].stationShortCode;
    const infoObject = dto.timeTableRows.find(a => a.stationShortCode = code && a.type === 'DEPARTURE');
    const formattedDate = new Date(infoObject.scheduledTime);
    formattedDate.setMinutes(formattedDate.getMinutes() + infoObject.differenceInMinutes);
    const scheduledTime = this.makeDatePretty(new Date(infoObject.scheduledTime));
    const displayDate = this.makeDatePretty(formattedDate);
    console.log(startStation);

    return new TrainInfo(
      dto.trainType + ' ' + dto.trainNumber,
      startStation,
      destination, 
      infoObject.cancelled,
      scheduledTime,
      infoObject.differenceInMinutes,
      
      displayDate,
      );
  }

}
