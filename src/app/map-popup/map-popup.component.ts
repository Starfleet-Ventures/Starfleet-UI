import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css'],
  providers: [AppService]
})
export class MapPopupComponent implements OnInit {
  @Input() imgUrl;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }
  submit(): void {
   const imgUrlPar = this.imgUrl.split('/');
   const image = imgUrlPar[imgUrlPar.length -1];  
   this.appService.detectBuildings(image).subscribe(success =>{
      console.log(success.imageUrl);
    },failure=>{
      console.log("failure");
      console.log(failure.imageUrl);
    })
  }
}
