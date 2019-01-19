import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';

import { StationClient, Station, LocationClient, Location } from '../../services/restclient/restclient';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-my-stations',
  templateUrl: './my-stations.component.html',
  styleUrls: ['./my-stations.component.css'],
  providers: [MessageService]
})
export class MyStationsComponent implements OnInit {

  constructor(private stationClient : StationClient, private authenticationService : AuthenticationService, private locationClient : LocationClient, private messageService: MessageService) { }

  ngOnInit() {
    this.stationClient.getByCreator(this.authenticationService.getLoggedIn().username).subscribe(val => { this.stations = val});
  }

  stations: Station[];
  selectedStation: Station;

  display: Boolean = false;

  msgs: Message[] = [];


  name: String;
  type: String;
  location: Number;
  street: String;
  longitude: Number;
  latitude: Number;


  editStation = function (station : Station) {
    this.display = true;
    this.selectedStation = station;
    this.name = station.name;
    this.type = station.type;
    this.location = station.location;
    this.street = station.street;
    this.latitude = station.latitude;
    this.longitude = station.longitude;
  }

  updateStation = function () {

    if( this.name.trim() != '' && 
        this.type.trim() != '' &&
        this.street.trim()!= '')
    {
        this.selectedStation.name = this.name;
        this.selectedStation.type = this.type;
        this.selectedStation.location = this.location;
        this.selectedStation.street = this.street;
        this.selectedStation.latitude = this.latitude;
    
        this.stationClient.update(this.selectedStation).subscribe(res =>  this.messageService.add({severity:'success', summary:'Station erfolgreich gespeichert'}););
        this.display = false;
    } else {
      this.msgs.push({severity:'error', summary:'Speichern nicht erfolgreich', detail:'Bitte geben Sie nur erlaubte Werte ein'});
    }


  }

  cancelEditing = function () {
    this.display = false;
  }

}
