import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
interface feature{
  image:string,
  heading:string,
  subheading:string
}
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  images: feature[] = [
    { 
      image:'https://www.nasa.gov/sites/default/files/thumbnails/image/campfire-resized.jpg',
      heading:'Planet Wide Surveillance',
      subheading:'Get data of events from across the world from the comfort of your location.'
    },
    { 
      image:'https://cdnph.upi.com/svc/sv/upi/24801275483022/2010/1/52d7dac78f080b289a4172bc0ea74415/Oil-rig-explosion.jpg',
      heading:'Unstoppable Transparency',
      subheading:'View the world from the skies and never miss any event.'
    },
    { 
      image:'https://free4kwallpapers.com/uploads/originals/2015/08/25/earth-from-space-sunrise.jpg',
      heading:'Forecasting the future',
      subheading:'Predict the future with our change detection models on historical data.'
    }

]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
