import { Component, OnInit, Input } from '@angular/core';
import { Station, MeasurementType, MeasurementClient, Measurement, GetMeasurementTupel } from '../../services/restclient/restclient';

interface typeValue {
  type: string;
  value: Number;
}

@Component({
  selector: 'app-station-report',
  templateUrl: './station-report.component.html',
  styleUrls: ['./station-report.component.css']
})
export class StationReportComponent implements OnInit {

  @Input() station: Station;
  @Input() aggregation: string;
  @Input() types: any[];

  constructor(private measurementClient : MeasurementClient) { }

  ngOnInit() {

    this.types.forEach(type => {this.fillData(type);});
  }

  displayData: typeValue[] = [];

  //because of JSON stringify type turns into Type
  fillData(type: any) {
    //unfortunately, this has to be mocked because the calls to the api yield no results

    console.log(type.Type);

    var generatedValue: Number;
    switch(type.Type){
      case("Air_Pressure"): {
        generatedValue = this.getRandomArbitrary(650, 1020);
        break;
      }
      case("Air_Temperature"): {
        generatedValue = this.getRandomArbitrary(-20, 35);
        break;
      }
      case("Humidity"): {
        generatedValue = this.getRandomArbitrary(0, 100);
        break;
      }
      case("Percipitation"): {
        generatedValue = this.getRandomArbitrary(0, 35);
        break;
      }
      case("Wind_Direction"): {
        generatedValue = this.getRandomArbitrary(9000, 10000);
        break;
      }
      case("Wind_Speed"): {
        generatedValue = this.getRandomArbitrary(0, 100);
        break;
      }
      default: {
        generatedValue = 0;
      }
    }
    this.displayData.push({type: type.Type, value: generatedValue});
    console.log(this.displayData);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
