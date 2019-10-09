import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-sort-criteria',
  templateUrl: './sort-criteria.component.html',
  styleUrls: ['./sort-criteria.component.css']
})
export class SortCriteriaComponent implements OnInit {
  filterByCategory:string;
  max:number=0;
  constructor(private router:Router) { }

  ngOnInit() {
  }
 formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } 
    sessionStorage.setItem("price",String(value));
  console.log(value);
  return value;
 }

 sortByPrice()
 {  
    this.max = Number(sessionStorage.getItem("price"));
    sessionStorage.setItem("priceRange",String(this.max))
    this.router.navigate(['home'])
    .then(()=>{this.router.navigate(['restaurant'])})
 }
 sortRestaurantByRating(num)
{ 
  
  console.log("sort function called")
  sessionStorage.setItem("filterByRating",num);
  this.router.navigate(['home'])
    .then(()=>{this.router.navigate(['restaurant'])})
 
}  
  
filterRestaurantByCategory(value)
  {  
    console.log("sort by category called")
    sessionStorage.setItem("filterByCategory",value)
    this.router.navigate(['home'])
      .then(()=>{this.router.navigate(['restaurant'])})
  }

}
