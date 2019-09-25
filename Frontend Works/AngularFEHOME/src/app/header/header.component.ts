import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginStatus:any;


  constructor(private previousRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() { 
    
  }
  redirect(routeTo)
  {  
      if(routeTo=='login')
     {
      this.router.navigate(['login'])
     } else if(routeTo=='register'){
       this.router.navigate(["register"])
     }
     else if(routeTo=='home')
     {
      this.router.navigate(['home'])
     }
     else if(routeTo=='aboutUs')
     {
       this.router.navigate(['aboutUs'])
     }
     else
     {
       this.router.navigate(['/query'],{ queryParams: {id:7 , name:'ibm' }})
     }
  }

}
