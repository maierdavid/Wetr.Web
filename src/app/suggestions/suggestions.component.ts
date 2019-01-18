import { Component, OnInit, Input } from '@angular/core';
import { StationClient, LocationClient, Location, Station } from '../../restclient/restclient';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  @Input() location: Location;

  locations: Location[];
  stations: Station[] = []

  constructor(private stationClient : StationClient, private locationClient : LocationClient) { }

  ngOnInit() {
    // this.sameDistrict();
  }

  sameDistrict() {
    this.locationClient.getByDistrict(this.location.districtName).subscribe(val => {
      this.locations = val;
      this.locations.forEach(value => {
        this.stationClient.getByLocation(value.postCode).subscribe(station => {
            this.stations.concat(station);
        })
      })
    });
  }

}
