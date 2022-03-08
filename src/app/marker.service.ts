import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './popup.service';
import { AppService } from './app.service';
@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient,@Inject(PopUpService) private popupService: PopUpService,@Inject(AppService) private appService: AppService) { }

  makeCapitalMarkers(map: L.map): void { 
    console.log('marker');
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        const image = c.properties.img;
        let imgArray = image.split('/');
        let processedImageUrl = undefined;
        this.appService.getProcessedImages(imgArray[imgArray.length-1]).subscribe(success=>{
        if(success.processedUrl !== undefined){
          processedImageUrl = success.processedUrl;
        }},
        failure=>console.error(failure));
        // marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        marker.bindPopup(() => this.popupService.createCustomPopup(image,processedImageUrl)).openPopup();
        marker.addTo(map);
      }
    });
  }
}
