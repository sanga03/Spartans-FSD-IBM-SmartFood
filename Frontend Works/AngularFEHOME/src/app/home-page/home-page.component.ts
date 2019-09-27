import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  searchRestaurantForm:FormGroup;
  constructor(private router:Router) { }

  ngOnInit() { 
    this.searchRestaurantForm= new FormGroup(
      {
        searchCriteria: new FormControl()
      }
    )
  }
  redirectToRestaurant()
  {
    console.log(this.searchRestaurantForm.get("searchCriteria").value);
    console.log("inside redirect function");
    sessionStorage.setItem("criteria",this.searchRestaurantForm.get("searchCriteria").value);
    this.router.navigate(['restaurant']);
  }
}
