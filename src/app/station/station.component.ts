import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../../restclient/restclient';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  @Input() station: Station;

  constructor() { }

  ngOnInit() {
  }

}
