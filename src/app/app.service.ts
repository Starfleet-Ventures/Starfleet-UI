import { HttpClient,HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { CountriesInfo } from './model/countries.model';
@Injectable({
    providedIn: 'root'
  })
export class AppService{
    constructor(private httpClient: HttpClient) { }
    private SERVER_URL = 'http://34.139.101.136:8000';
    
    getCountriesInfo(){
        return this.httpClient.get<{response: CountriesInfo[]}>(this.SERVER_URL+'/form/getCountriesInfo');
    }
    // getLanguages(){
    //     return this.httpClient.get<{response: [{'_id': String, "value": String, "viewValue": String}]}>(this.SERVER_URL+'getLanguage');
    // }
    postDemoFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: String}>(this.SERVER_URL+'/form/postDemoForm', data);
    }
    detectBuildings(image: string,type: string){
        let data = {imageName: image, modelType: type};
        
        return this.httpClient.post<{processedImageUrl: string}>(this.SERVER_URL+'/api/detect',data);
    }
    getProcessedImages(image: string, type: string){
        let params = new HttpParams().set('image',image);
        params.set('modelType',type);
        return this.httpClient.get<{processed: string}>(this.SERVER_URL+'/api/getProcessedImages',{params: params});
    }
    postRegistrationFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>(this.SERVER_URL+'/auth/register', data);
    }
    postLoginFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>(this.SERVER_URL+'/auth/login', data);
    }
}