import { Component, OnInit, Input } from '@angular/core';
import { Station, MeasurementType, MeasurementClient, Measurement, GetMeasurementTupel } from '../../services/restclient/restclient';

interface typeValue {
  type: string;
  value: Number;
  unit: string;
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

    var generatedValue: Number;
    var typeLabel: string;
    switch(type.Type){
      case("Air_Pressure"): {
        generatedValue = this.getRandomArbitrary(650, 1020);
        typeLabel = "Luftdruck";
        break;
      }
      case("Air_Temperature"): {
        generatedValue = this.getRandomArbitrary(-20, 35);
        typeLabel = "Temperatur";
        break;
      }
      case("Humidity"): {
        generatedValue = this.getRandomArbitrary(0, 100);
        typeLabel = "Luftfeuchtigkeit";
        break;
      }
      case("Percipitation"): {
        generatedValue = this.getRandomArbitrary(0, 35);
        typeLabel = "Niederschlagsmenge";
        break;
      }
      case("Wind_Direction"): {
        generatedValue = this.getRandomArbitrary(9000, 10000);
        typeLabel = "Windrichtung";
        break;
      }
      case("Wind_Speed"): {
        generatedValue = this.getRandomArbitrary(0, 100);
        typeLabel = "Windgeschwindigkeit";
        break;
      }
      default: {
        generatedValue = 0;
      }
    }
    this.displayData.push({type: typeLabel, value: generatedValue, unit: type.Unit});
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
