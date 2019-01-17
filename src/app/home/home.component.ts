import { Component, OnInit } from '@angular/core';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import { Router } from '@angular/router';

import { LocationClient, Location } from '../../restclient/restclient'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private locationClient : LocationClient, private router : Router) { }

  ngOnInit() {
    this.locationClient.getAll().subscribe(val =>{
      this.source = val;
    });
  }

  location: Location;

  source: Location[];

  results: Location[];


  search(event) {
    var temp: Location[] = [];
    this.source.forEach(element => {
      if((element.communityName.toLowerCase().indexOf(event.query.toString().toLowerCase() ) != -1) || (element.postCode.toString().indexOf(event.query) != -1)){
        temp.push(element);
      }
    this.results = temp;
    });
  }

  navigateToLocation = function() {
    if(this.location != null && this.location.postCode != null){
      console.log(this.location);
      var route = "/location/" + this.location.postCode;
      this.router.navigateByUrl(route);
    }
  }
}
