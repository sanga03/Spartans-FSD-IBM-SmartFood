import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-food-recomend',
  templateUrl: './food-recomend.component.html',
  styleUrls: ['./food-recomend.component.css']
})
export class FoodRecomendComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

}
