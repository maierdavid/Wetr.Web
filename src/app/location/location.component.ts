import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationClient, Station, LocationClient, Location } from '../../restclient/restclient';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private route : ActivatedRoute, private stationClient : StationClient, private locationClient : LocationClient) { }

  ngOnInit() {
    this.postCode = +this.route.snapshot.paramMap.get('postCode');
    this.locationClient.getByCode(this.postCode).subscribe(val => {this.location = val})
    this.stationClient.getByLocation(this.postCode).subscribe(val => {this.stations = val});
  }

  postCode: number;

  stations: Station[];
  location: Location;
}
