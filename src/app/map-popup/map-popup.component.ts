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
  @Output() formSubmit = new EventEmitter<{image: string,type: string}>();
  @Input() processedImages: string[];
  @Input() spinner: boolean = false;
  @Input() failure: boolean = false;
  @Input() flex: string;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
   console.log(this.imageUrl);
   console.log(this.processedImages); 
  }
  
  buttonActive(): string {
    let partial = this.processedImages[0].split('/');
    let name = partial[partial.length-1];
    let type = name.split('_')[0];
    return type;
  }
  submit(type: string): void {
   const imgUrlPar = this.imageUrl.split('/');
   const image = imgUrlPar[imgUrlPar.length -1];  
   this.formSubmit.emit({image,type});
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
