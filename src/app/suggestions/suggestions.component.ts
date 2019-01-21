import { Component, OnInit, Input } from '@angular/core';
import { StationClient, LocationClient, Location, Station } from '../../services/restclient/restclient';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  @Input() location: Location;

  locations: Location[];
  stations: Station[] = [];

  suggestions: any[] = [];

  constructor(private stationClient : StationClient, private locationClient : LocationClient) { }

  ngOnInit() {
     this.sameDistrict();
  }

  sameDistrict() {
    this.locationClient.getByDistrict(this.location.districtName).subscribe(val => {
      val.forEach( loc => {
        this.stationClient.getByLocation(loc.postCode).subscribe( sta => {
          if(sta.length > 0){
            this.suggestions.push(loc);
          }
        });
      })
    });
    if(this.suggestions.length == 0){
      this.sameProvince();
    }
  }

  sameProvince() {
    this.locationClient.getByProvince(this.location.provinceName).subscribe(val => {
      val.forEach( loc => {
        this.stationClient.getByLocation(loc.postCode).subscribe( sta => {
          if(sta.length > 0){
            this.suggestions.push(loc);
          }
        });
      })
    });
  }

}
