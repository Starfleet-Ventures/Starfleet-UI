import { HttpClient,HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { CountriesInfo } from './model/countries.model';
@Injectable({
    providedIn: 'root'
  })
export class AppService{
    constructor(private httpClient: HttpClient) { }
    private SERVER_URL = 'https://starfleet.ventures';
    
    getCountriesInfo(){
        return this.httpClient.get<{response: CountriesInfo[]}>('/form/getCountriesInfo');
    }
    // getLanguages(){
    //     return this.httpClient.get<{response: [{'_id': String, "value": String, "viewValue": String}]}>(this.SERVER_URL+'getLanguage');
    // }
    postDemoFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: String}>('/form/postDemoForm', data);
    }
    detectBuildings(image: string,type: string){
        let data = {imageName: image, modelType: type};
        
        return this.httpClient.post<{processedImageUrl: string}>('/api/detect',data);
    }
    getProcessedImages(image: string, type: string){
        let params = new HttpParams().set('image',image);
        params.set('modelType',type);
        return this.httpClient.get<{processed: string}>('/api/getProcessedImages',{params: params});
    }
    postRegistrationFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>('/auth/register', data);
    }
    postLoginFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>('/auth/login', data);
    }
}