import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathMatch } from 'tough-cookie';
import { HomePageComponent } from './home-page/home-page.component';
import { SignComponent } from './sign/sign.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';


const routes: Routes = [

  {
    path:" ",
    component: HomePageComponent
  },
    {
      path:"login",
      component: SignComponent
    },
    {
      path:"home",
      component: HomePageComponent
    },
    {
      path:"customerProfile",
      component: CustomerProfileComponent
    },
    {
      path:"**",
      component: HomePageComponent
    }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
