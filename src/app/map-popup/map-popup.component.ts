import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css'],
  providers: [AppService]
})
export class MapPopupComponent implements OnInit {
  @Input() imageUrl;
  @Output() formSubmit = new EventEmitter<string>();
  @Input() processedImageUrl: string;
  @Input() spinner: boolean = false;
  @Input() failure: boolean = false;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
   console.log(this.imageUrl);
   console.log(this.processedImageUrl); 
  }
  submit(): void {
   const imgUrlPar = this.imageUrl.split('/');
   const image = imgUrlPar[imgUrlPar.length -1];  
   this.formSubmit.emit(image);
  //  this.spinner = true;
  //  this.appService.detectBuildings(image).subscribe(success =>{
  //     console.log("Here");
  //     this.processedImageUrl = success.imageUrl;
  //     this.spinner = false;
  //   },failure=>{
  //     this.failure = true;
  //     this.spinner = false;
  //     console.log("failure");
  //     console.log(failure.imageUrl);
  //   })
  }
}
