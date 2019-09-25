import { Component, OnInit } from '@angular/core';
import {NgbdCarouselBasic} from 'bootstrap'
@Component({
  selector: 'app-anim-slider',
  templateUrl: './anim-slider.component.html',
  styleUrls: ['./anim-slider.component.css']
})
export class AnimSliderComponent implements OnInit {
images=[ 
  
  'http://www.theivanhoepub.com/wp-content/uploads/2010/09/colddish.jpg',
  'https://www.camelliabrand.com/static/wp-content/uploads/2017/07/BBB_2-1000x400.jpg',
  'https://enfntsterribles.com/wp-content/uploads/2016/09/EnfntsTerribles-stop-counting-calories-1000x400.jpg',
  'https://www.wineanddine.com.sg/wp/wp-content/uploads/2017/05/Photo-Burger-Lobster-Grilled-Lobster-Lobster-Rolls-Burger.jpg',
  'https://spanishsabores.com/wp-content/uploads/2019/01/DSC07278.jpg',
  'http://www.thenutfit.com/pro_images/calories13_07_08.png']
   constructor() { }

  ngOnInit() {
  }

}
