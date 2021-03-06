import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationClient, Station, LocationClient, Location } from '../../services/restclient/restclient';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private route : ActivatedRoute, private stationClient : StationClient, private locationClient : LocationClient) { }

  ngOnInit() {
    this.route.url.subscribe( url => {this.postCode = +url[1].toString();
      if(!isNaN(this.postCode))
      this.locationClient.getByCode(this.postCode).subscribe(val => {
        this.location = val; 
        if(this.location)
          this.stationClient.getByLocation(this.location.postCode).subscribe(val => {this.stations = val});
      });
    });
  }

  postCode: number;

  stations: Station[];
  location: Location;
}
