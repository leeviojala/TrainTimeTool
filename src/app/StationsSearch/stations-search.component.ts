import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { TrainservicesService } from '../trainservices.service';
import { TrainInfo } from '../models/trainInfo.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ParseError } from '@angular/compiler';


@Component({
  selector: 'app-stations-search',
  templateUrl: './stations-search.component.html',
  styleUrls: ['./stations-search.component.scss']
})
export class StationsSearchComponent implements OnInit {

  public stations: Station[] = [];
  public departureTrains: TrainInfo[] = [];
  public arrivingTrains: TrainInfo[] = [];
  public value: string;
  public errorFlag: Boolean;
  public myControl = new FormControl();


  constructor(
    private trainservice: TrainservicesService
  ) { }

  filteredStations: Observable<Station[]>;


  ngOnInit() {
    this.trainservice.getStations().subscribe(result => {
      this.stations = result;
      this.filteredStations = this.myControl.valueChanges
        .pipe(
          startWith<string | Station>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.stations.slice())

        );
    });

    this.myControl.valueChanges.subscribe(value => {
      // this.getStationCode();
      this.getDepartureTrainsFromRest();
      this.getArrivingTrainsFromRest();
    })



    // this.myControl.registerOnChange(this.getStationCode());
  }
  displayFn(station?: Station): string | undefined {
    return station ? station.name : undefined;
  }

  private _filter(name: string): Station[] {
    const filterValue = name.toLowerCase();

    return this.stations.filter(station => station.name.toLowerCase().indexOf(filterValue) === 0);
  }


  getDepartureTrainsFromRest() {
    let stationSearch = this.myControl.value;
    this.trainservice.getDepartureTrains(stationSearch.code).subscribe(result => {
      result.forEach(a => {
        a.startStation = this.capitalize(this.stations.find(s => s.code === a.startStation).name);
        a.destinationStation = this.capitalize(this.stations.find(s => s.code === a.destinationStation).name);
      })
      this.departureTrains = result;

    });
  }

  getArrivingTrainsFromRest() {
    let stationSearch = this.myControl.value;
    this.trainservice.getArrivingTrains(stationSearch.code).subscribe(result => {
      result.forEach(a => {
        a.startStation = this.capitalize(this.stations.find(s => s.code === a.startStation).name);
        a.destinationStation = this.capitalize(this.stations.find(s => s.code === a.destinationStation).name);
      })
      this.arrivingTrains = result;
    });
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
