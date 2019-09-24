import { Component } from '@angular/core';
import {NgbCarouselConfig ,  NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})
export class AppComponent {
  title = 'smart-food'; 
  
    showNavigationArrows = false;
    showNavigationIndicators = false;
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  
    constructor(config: NgbCarouselConfig) {
      // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
    }
 
  }

