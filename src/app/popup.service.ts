import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { AppService } from './app.service';
import { MapPopupComponent } from './map-popup/map-popup.component';



@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  // component: ComponentFactory<MarkerComponent>
  component: ComponentRef<MapPopupComponent>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,private appRef: ApplicationRef,@Inject(AppService) private appService: AppService){}
  
  createCustomPopup(img: string,processedImages: string[]) { 
    if(this.component) this.component.destroy();
      const factory = this.componentFactoryResolver.resolveComponentFactory(MapPopupComponent);
      this.component = factory.create(this.injector);
  
      //Set the component inputs manually 
      this.component.instance.imageUrl = img;
      // component.instance.someinput2 = "example";
      this.component.instance.processedImages = processedImages;
      this.component.instance.flex = processedImages.length === 2 ?"33.33%":processedImages.length === 1 ?"50%": undefined;
      // //Subscribe to the components outputs manually (if any)        
      this.component.instance.formSubmit.subscribe((event) => {
         this.component.instance.spinner = true;
        this.appService.detectBuildings(event.image,event.type).subscribe(success =>{
            console.log("Here");
            processedImages.push(success.processedImageUrl);
            this.component.instance.processedImages = processedImages;
            this.component.instance.flex = processedImages.length === 2 ?"33.33%":processedImages.length === 1 ?"50%": undefined;
            this.component.instance.spinner = false;
          },failure=>{
            this.component.instance.failure = true;
            this.component.instance.spinner = false;
            console.log("failure");
            console.log(failure.imageUrl);
          })
      });
  
      // //Manually invoke change detection, automatic wont work, but this is Ok if the component doesn't change
      this.appRef.attachView(this.component.hostView);
      this.component.onDestroy(() => {
        this.appRef.detachView(this.component.hostView);
        this.component.instance.formSubmit.unsubscribe();
      });
      this.component.changeDetectorRef.detectChanges();
  
      return this.component.location.nativeElement;
  }
  
  makeCapitalPopup(data: any): string { 
    // let compRef = this.component.create(this.injector);
    // compRef.instance.src="https://media.istockphoto.com/photos/sunrise-at-the-farmhouse-picture-id1284634579?b=1&k=20&m=1284634579&s=170667a&w=0&h=SfgSMsk34KM-ymnXrAsNWfXCuWrj5Q6DOsYMLM146yY=";
    // return compRef.location.nativeElement;
    return  `
    
    <style type="text/css">
    .leaflet-popup-content-wrapper, .leaflet-popup-tip{
      background: #f5f5f5;
    }
    .leaflet-popup-content-wrapper{
      border-radius: 2px;
    }
    .leaflet-container a.leaflet-popup-close-button{
      padding: 1px 0.25px 0 0;
      color: black;
    }
    button#btn-alert{
      color: white;
      background: orange;
      font-size: 12px;
      width:8.45em;
      padding: 1px;
      border: none;
    }
    .leaflet-popup-content {
      padding: 0;
      width: 100px;
      height: 100px;
    }
    .loader {
      display: inline-block;
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #3498db;
      width: 30px;
      height: 30px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
    }
    
    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    <div id="main leaflet-popup-content">
    <!-- <div class="loader"></div> -->
    <div id="overlay-1" style="text-align: center;">
    <img id="img" src="https://media.istockphoto.com/photos/sunrise-at-the-farmhouse-picture-id1284634579?b=1&k=20&m=1284634579&s=170667a&w=0&h=SfgSMsk34KM-ymnXrAsNWfXCuWrj5Q6DOsYMLM146yY=" style="max-width:100%;
    max-height:100%;"/>
    </div>
    </div>
    <button id="btn-alert" onclick="
    function detect(){
      let el = document.getElementById('img');
      
      if(el.style.display === 'none'){
        el.style.setProperty('display','initial');
        document.querySelectorAll('.loader').forEach(function(a) {
          a.remove();
        })
      }else{
        el.style.display = 'none';
        let nel = document.createElement('div');
      nel.setAttribute('class', 'loader');
      document.getElementById('overlay-1').appendChild(nel);
      } 
    };
    detect()"> Submit 
    
</button>
    
    `
  }
}
