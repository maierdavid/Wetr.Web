import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.postCode = +this.route.snapshot.paramMap.get('postCode');
  }

  postCode: number;

}
