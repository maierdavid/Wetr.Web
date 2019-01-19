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

  displayEdit: Boolean = false;
  displayDelete: Boolean = false;
  displayCreate: Boolean = false;

  msgs: Message[] = [];


  name: String;
  type: String;
  location: Number;
  street: String;
  longitude: Number;
  latitude: Number;


  editStation = function (station : Station) {
    this.displayEdit = true;
    this.selectedStation = station;
    this.name = station.name;
    this.type = station.type;
    this.location = station.location;
    this.street = station.street;
    this.latitude = station.latitude;
    this.longitude = station.longitude;
  }

  updateStation = function () {
    if( this.validateStation();)
    {
        this.fillSelectedStation();
    
        this.stationClient.update(this.selectedStation).subscribe(res =>  this.messageService.add({severity:'success', summary:'Station erfolgreich gespeichert'}););
        this.displayEdit = false;
    } else {
      this.msgs.push({severity:'error', summary:'Speichern nicht erfolgreich', detail:'Bitte geben Sie nur erlaubte Werte ein'});
    }
  }

  cancelEditing = function () {
    this.selectedStation = null;
    this.displayEdit = false;
  }

  confirmDeleteStation = function (station : Station) {
    this.displayDelete = true;
    this.selectedStation = station;
  }

  deleteStation = function () {
    this.stationClient.delete(this.selectedStation).subscribe(res =>  this.messageService.add({severity:'success', summary:'Station erfolgreich gespeichert'}););
  }

  cancelDelete = function () {
    this.selectedStation = null;
    this.displayDelete = false;
  }

  createStation = function () {
    this.selectedStation = new Station;
    this.displayCreate = true;

  }

  sendStation = function () {

  }

  cancelCreate = function () {
    this.selectedStation = null;
    this.displayCreate = false;
  }

  validateStation() : Boolean{
    return (this.name.trim() != '' && 
    this.type.trim() != '' &&
    this.street.trim()!= '')
  }

  fillSelectedStation () {
    this.selectedStation.name = this.name;
        this.selectedStation.type = this.type;
        this.selectedStation.location = this.location;
        this.selectedStation.street = this.street;
        this.selectedStation.latitude = this.latitude;
  }

}
