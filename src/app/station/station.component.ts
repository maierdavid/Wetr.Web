import { Component, OnInit, Input } from '@angular/core';

import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';

import { Station, MeasurementClient, MeasurementType, GetMeasurementTupel, Measurement, FilterTupel } from '../../services/restclient/restclient';

interface Aggregation {
  label: string;
  value: string;
}

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})

export class StationComponent implements OnInit {

  @Input() station: Station;

  constructor(private measurementClient : MeasurementClient) { }

  ngOnInit() {
    this.measurementClient.getALLTypes().subscribe(res => { this.measurementTypes = res; this.selectedMeasurementType= this.measurementTypes[0]});

    
  }

  measurementTypes: MeasurementType[];
  selectedMeasurementType: MeasurementType;
  rangeDates: Date[];

  aggregations: Aggregation[] = [{label: "Stündlich", value: "hour"},
                                 {label: "Täglich", value: "day"},
                                 {label: "Wöchentlich", value: "week"},
                                 {label: "Monatlich", value: "month"}];

  selectedAggregation: String = this.aggregations[0].value;

  measurements: Measurement[];
  data: any;

  setData = function () {
    if(this.rangeDates != null && this.rangeDates[0] != null && this.rangeDates[1] != null){
      var gmt = new GetMeasurementTupel();
      gmt.startDate = this.rangeDates[0];
      gmt.endDate = new Date(this.rangeDates[1]);
      gmt.measurementType = [this.selectedMeasurementType];
      gmt.stations = [this.station];

      this.measurementClient.getByStationAndTypeInTimeSpan(gmt).subscribe(res => {
        this.measurements = res;
        this.setChartData(res);
      });
    }
  }

  setChartData(measurements : Measurement[]){
    switch(this.selectedAggregation){
      case "hour" : {
        this.measurementClient.filterHour(measurements).subscribe(data => {
          this.fillChartData(data);
        });
        break;
      }
      case "day" : {
        this.measurementClient.filterDay(measurements).subscribe(data => {
          this.fillChartData(data);
        });
        break;
      }
      case "week" : {
        this.measurementClient.filterWeek(measurements).subscribe(data => {
          this.fillChartData(data);
        });
        break;
      }
      case "month" : {
        this.measurementClient.filterMonth(measurements).subscribe(data => {
          this.fillChartData(data);
        });
        break;
      }

    }
  }

  fillChartData(data : FilterTupel[]){
    var labels: string[] = [];
    var max: any[] = [];
    var min: any[] = [];
    var avg: any[] = [];

    data.forEach(filterTupel => {
      labels.push("");
      max.push(filterTupel.max);
      min.push(filterTupel.min);
      avg.push(filterTupel.avg);
    });

    this.data = {
      labels: labels,
      datasets: [
          {
              label: 'Max',
              data: max,
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
            label: 'Min',
            data: min,
            fill: false,
            borderColor: '#ff00ff'
          },
          {
            label: 'Avg',
            data: avg,
            fill: false,
            borderColor: '#00ffff'
          }
      ]
  }
  }
}
