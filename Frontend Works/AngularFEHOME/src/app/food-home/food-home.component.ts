import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-food-home',
  templateUrl: './food-home.component.html',
  styleUrls: ['./food-home.component.css']
})
export class FoodHomeComponent implements OnInit {
  constructor() {
    this.spinner.show('sp2')
   }

  ngOnInit() {
    
}

}