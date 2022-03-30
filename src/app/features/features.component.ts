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
      heading:'Forestry',
      subheading:'AI/ML based computer vision on satellite images offers huge possibilities in the field of forestry. We use these algorithms to identify the forest fuel maps and estimate the high risk areas in forest fires. We also use the current state of art technology to identify the changes in the forest coverage across the globe'
    },
    { 
      image:'https://cdnph.upi.com/svc/sv/upi/24801275483022/2010/1/52d7dac78f080b289a4172bc0ea74415/Oil-rig-explosion.jpg',
      heading:'Mining',
      subheading:'We aspire to use the LIDAR based satellite data to estimate the mining volume over a duration of time. This novel technology offers an unparalleled transparency into mining and can even be used during harsh weather conditions.'
    },
    { 
      image:'https://free4kwallpapers.com/uploads/originals/2015/08/25/earth-from-space-sunrise.jpg',
      heading:'Agriculture',
      subheading:'We plan to use satellite data to predict the agricultural output over a cultivation cycle. From identifying the agricultural fields, to estimating the agriculture output to predicting the future prices, we are creating a complete technological solution for the agricultural sector.'
    },
    { 
      image:'https://wallpapercave.com/wp/wp2209394.jpg',
      heading:'Oil and Gas',
      subheading:'Satellite imagery and GIS map data has huge cost benefits in tracking the pipeline corridor and can significantly reduce the number of safety and security issues in the supply chain. We would be aiding the supply managers with solutions that can help the planning of pipeline corridors through contour mapping and potential risk profiling.'
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
