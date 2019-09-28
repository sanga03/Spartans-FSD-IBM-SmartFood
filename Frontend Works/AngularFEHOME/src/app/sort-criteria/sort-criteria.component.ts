import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-criteria',
  templateUrl: './sort-criteria.component.html',
  styleUrls: ['./sort-criteria.component.css']
})
export class SortCriteriaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  sortRestaurantByRating(num)
  {
    sessionStorage.setItem("filterByRating",num);
    this.router.navigate(['restaurant']);

  }
}
