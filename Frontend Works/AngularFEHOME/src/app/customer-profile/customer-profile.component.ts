import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
   userName:string;
   email:string;
   customerObj:any
   customerPhysicalDetail:any
   physicalDetailForm:any
   options: string[] = ['One', 'Two', 'Three'];
    allStates:['One', 'Two', 'Three'];
    title = 'materialApp';
  //  myControl = new FormControl();
  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() { 
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
    if(this.email==null)
    {
      this.router.navigate(['home']);
    }
    var url = "http://b4ibm02.iiht.tech:8762/account/findEmail?email="+this.email;
    console.log(url);
    fetch(url).then(res=>res.json())
      .then(data=>
        {  
          this.customerObj=data;
          this.userName=data.name;
          
        })
      this.physicalDetailForm =  new FormGroup({
          height: new FormControl(),
          weight: new FormControl(),
          gender: new FormControl(),
          dob: new FormControl() })
  }

  redirectToHome()
  {  sessionStorage.removeItem('email');
    this.router.navigate(['home']);
  }

  setPhysicalDetail()
  {   var d:Date = new Date(this.physicalDetailForm.get('dob').value);
      var url = "http://b4ibm29.iiht.tech:1234/physicalDetails/"+this.customerObj.uid;
      console.log(this.physicalDetailForm.get('weight').value);
      console.log(url);
      console.log(d.getTime());
      fetch(
        url,
        {
          method: 'POST',
          headers:{
              'content-type':'application/json'
          },
          body: JSON.stringify( {
            "height": this.physicalDetailForm.get('height').value,
            "weight": this.physicalDetailForm.get('weight').value,
           "dob": d.getTime() ,
           "caloriesBurn": 13,
           "gender":  this.physicalDetailForm.get('gender').value
          
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
      })
  }

}
