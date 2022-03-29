import { Component,OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
interface DetailsComponent{
  heading: string,
  paragraph: string,
  bgClass: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  breakpoint: number;
  detailsList: DetailsComponent[] = [
    {
      bgClass: 'home',
      heading: 'Forestry',
      paragraph: 'AI/ML based computer vision on satellite images offers huge possibilities in the field of forestry. We use these algorithms to identify the forest fuel maps and estimate the high risk areas in forest fires. We also use the current state of art technology to identify the changes in the forest coverage across the globe'
    },
    {
      bgClass: 'about',
      heading: 'Mining',
      paragraph: 'We aspire to use the LIDAR based satellite data to estimate the mining volume over a duration of time. This novel technology offers an unparalleled transparency into mining and can even be used during harsh weather conditions.'
    },
    {
      bgClass: 'team',
      heading: 'Agriculture',
      paragraph: 'We plan to use satellite data to predict the agricultural output over a cultivation cycle. From identifying the agricultural fields, to estimating the agriculture output to predicting the future prices, we are creating a complete technological solution for the agricultural sector.'
    },
    {
      bgClass: 'registration',
      heading: 'Oil and Gas',
      paragraph: 'Satellite imagery and GIS map data has huge cost benefits in tracking the pipeline corridor and can significantly reduce the number of safety and security issues in the supply chain. We would be aiding the supply managers with solutions that can help the planning of pipeline corridors through contour mapping and potential risk profiling.'
    }
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public router: Router
  ){
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/icon/logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "linkedin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/icon/linkedin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "twitter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/icon/twitter.svg")
    );
  }
  title = 'Starfleet';
}
