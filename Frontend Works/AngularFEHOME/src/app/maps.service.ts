import { Injectable, NgModule } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
   
  constructor() {}
  // constructor(private http:HttpClient) { }

  // getLocation()
  // {  
  //   return this.http.get<location>('https://ipapi.co/json');
  // }
}

export interface location {
  ip: string,
  city: string,
  region: string,
  region_code: string,
  country: string,
  
  postal: string,
  latitude: number,
  longitude: number,
 
}
