import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-criteria',
  templateUrl: './sort-criteria.component.html',
  styleUrls: ['./sort-criteria.component.css']
})
export class SortCriteriaComponent implements OnInit {
  filterByCategory:string;
  constructor(private router:Router) { }

  ngOnInit() {
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
