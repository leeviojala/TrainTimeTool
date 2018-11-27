import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { TrainservicesService } from '../trainservices.service';
import { TrainInfo } from '../models/trainInfo.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {

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
      console.log(this.stations);
      this.filteredStations = this.myControl.valueChanges
        .pipe(
          startWith<string | Station>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.stations.slice())

        );
    });
    
    this.myControl.valueChanges.subscribe(value => {
     // this.getStationCode();
      const asd = this.getDepartureTrainsFromRest();
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
      this.departureTrains  = result
      this.departureTrains[0].startStation="dfasdfsdf";
      console.log(this.departureTrains);
    });
  }
  getStationName(a) {
    const sta = this.stations.find(s => s.code === a.startStation)
    const staString: string = sta.name
    return staString;
  }

  getArrivingTrainsFromRest() {
    let stationSearch = this.myControl.value;
    this.trainservice.getArrivingTrains(stationSearch.code).subscribe(result => {
      this.arrivingTrains = result;
      console.log(this.arrivingTrains);
    });
  }
/*
  getStationCode() {
      //this.myControl.setValue(val);
      
    let stationSearch = this.myControl.value;
    console.log(stationSearch);
    console.log(this.value);
    stationSearch = this.stations.find(s => s.name === this.value);
    if (stationSearch) {
      this.errorFlag = false;
      console.log(stationSearch.code);

      return stationSearch.code;
    } else {
      this.errorFlag = true;
    }

    
  }
*/
}
