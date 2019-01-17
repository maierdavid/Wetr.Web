import { Component, OnInit } from '@angular/core';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { LocationClient, Location } from '../../restclient/restclient'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private locationClient : LocationClient) { }

  ngOnInit() {
    console.log(this.locationClient);
    this.locationClient.getAll().subscribe(val =>{
      this.source = val;
    });
    console.log(this.source);

  }
  source: Location[];

  text: string;

  results: Location[];



  search(event) {
    var temp: Location[] = [];
    this.source.forEach(element => {
      console.log(element + " " + (element.communityName.indexOf(event.query) != -1));
      if(element.communityName.indexOf(event.query) != -1){
        temp.push(element);
      }
    this.results = temp;
    });
  }
}
