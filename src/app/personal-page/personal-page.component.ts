import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';

import { StationClient, MeasurementClient, Station, MeasurementType, User } from '../../services/restclient/restclient';
import { AuthenticationService } from '../../services/authentication/authentication.service';

interface Aggregation {
  label: string;
  value: string;
}

interface Preference {
  station: Station;
  aggregation: string;
  types: MeasurementType[];
}

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PersonalPageComponent implements OnInit {

  constructor(private stationClient : StationClient, private measurementClient : MeasurementClient, private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.stationClient.getALL().subscribe(res => {this.stations = res;});
    this.measurementClient.getALLTypes().subscribe(res => {this.measurementTypes = res; this.selectedMeasurementTypes = []});
    this.userId = this.authenticationService.getLoggedIn().id;
    this.preferences = JSON.parse(localStorage.getItem(this.userId.toString()));
  }

  userId: Number;

  preferences: Preference[];

  stations: Station[];
  filteredStations: Station[];
  selectedStation: Station;
  measurementTypes: MeasurementType[];
  selectedMeasurementTypes: MeasurementType[];
  aggregations: Aggregation[] = [{label: "Stündlich", value: "hour"},
  {label: "Täglich", value: "day"},
  {label: "Wöchentlich", value: "week"},
  {label: "Monatlich", value: "month"}];

selectedAggregation: String = this.aggregations[0].value;


  displayCard: Boolean;

  openCard = function () {
    this.displayCard = true;
  }

  sendCard = function (){
    if(this.selectedStation != null && this.selectedAggregation != null && this.selectedMeasurementTypes){
      var pref: Preference = {station: this.selectedStation, aggregation: this.selectedAggregation, types: this.selectedMeasurementTypes};

      if(this.preferences == null){
        this.preferences = [];
      }
  
      this.preferences.push(pref);
      localStorage.setItem(this.userId.toString(), JSON.stringify(this.preferences));
      this.preferences = JSON.parse(localStorage.getItem(this.userId.toString()));
    }

  }

  cancelCard = function () {
    this.displayCard = false;
  }

  deleteCard = function (preference: Preference){

    const index = this.preferences.indexOf(preference, 0);
    if (index > -1) {
      this.preferences.splice(index, 1);
    }

    localStorage.setItem(this.userId.toString(), JSON.stringify(this.preferences));
    this.preferences = JSON.parse(localStorage.getItem(this.userId.toString()));
  }

  search(event) {
    var temp: Station[] = [];
    this.stations.forEach(element => {
      if((element.name.toLowerCase().indexOf(event.query.toString().toLowerCase() ) != -1) || (element.location.toString().indexOf(event.query) != -1)){
        temp.push(element);
      }
    this.filteredStations = temp;
    });
  }

}
