import { Component, OnInit, Input } from '@angular/core';
import { Station, MeasurementType } from '../../services/restclient/restclient';

@Component({
  selector: 'app-station-report',
  templateUrl: './station-report.component.html',
  styleUrls: ['./station-report.component.css']
})
export class StationReportComponent implements OnInit {

  @Input() station: Station;
  @Input() aggregation: string;
  @Input() type: MeasurementType[];

  constructor() { }

  ngOnInit() {
  }

}
