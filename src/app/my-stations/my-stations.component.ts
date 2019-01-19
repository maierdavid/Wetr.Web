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
    this.user = this.authenticationService.getLoggedIn();
    this.stationClient.getByCreator(this.user.username).subscribe(val => { this.stations = val});
  }

  user: User;

  stations: Station[];
  selectedStation: Station = new Station();
  prevStation: Station;

  displayEdit: Boolean = false;
  displayDelete: Boolean = false;
  displayCreate: Boolean = false;

  updateMessages: Message[] = [];
  createMessages: Message[] = [];


  name: String;
  type: String;
  location: Number;
  street: String;
  longitude: Number;
  latitude: Number;


  editStation = function (station : Station) {
    this.displayEdit = true;
    this.selectedStation = station;
    this.prevStation = { ...station };
  }

  updateStation = function () {
    var valid = this.validateStation();
    if(valid) {
        this.stationClient.update(this.selectedStation).subscribe(res =>  this.messageService.add({severity:'success', summary:'Station erfolgreich gespeichert'}););
        this.displayEdit = false;
    } else {
      this.updateMessages.push({severity:'error', summary:'Speichern nicht erfolgreich', detail:'Bitte geben Sie nur erlaubte Werte ein'});
    }
  }

  cancelEditing = function () {
    this.restoreSelectedStation();
    this.selectedStation = new Station;
    this.displayEdit = false;
  }

  restoreSelectedStation() {
    this.selectedStation.name = this.prevStation.name;
    this.selectedStation.type = this.prevStation.type;
    this.selectedStation.location = this.prevStation.location;
    this.selectedStation.street = this.prevStation.street;
    this.selectedStation.latitude = this.prevStation.latitude;
    this.selectedStation.longitude = this.prevStation.longitude;
  }

  confirmDeleteStation = function (station : Station) {
    this.displayDelete = true;
    this.selectedStation = station;
  }

  deleteStation = function () {
    this.stationClient.delete(this.selectedStation.name).subscribe(res =>  this.messageService.add({severity:'success', summary:'Station erfolgreich gelöscht'}););
    const index = this.stations.indexOf(this.selectedStation, 0);
    if (index > -1) {
      this.stations.splice(index, 1);
    }
    this.cancelDelete();
  }

  cancelDelete = function () {
    this.selectedStation = new Station();
    this.displayDelete = false;
  }

  createStation = function () {
    this.selectedStation = new Station;
    this.selectedStation.id=0;
    this.selectedStation.creator = 
    this.displayCreate = true;

  }

  sendStation = function () {
    var valid = this.validateStation();
    if(valid){
      this.stationClient.insert(this.selectedStation).subscribe(res =>  {
        this.messageService.add({severity:'success', summary:'Station erfolgreich gespeichert'});
        this.stations.push(this.selectedStation);
      });
      this.displayCreate = false;
    } else {
      this.updateMessages.push({severity:'error', summary:'Anlegen nicht erfolgreich', detail:'Bitte geben Sie nur erlaubte Werte ein'});
    }
  }

  cancelCreate = function () {
    this.selectedStation = new Station();
    this.displayCreate = false;
  }

  validateStation() : Boolean{
    return (this.selectedStation.name.trim() != '' && 
    this.selectedStation.type.trim() != '' &&
    this.selectedStation.street.trim()!= '');
  }
}
