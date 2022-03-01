import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { CountriesInfo } from './model/countries.model';
@Injectable()
export class AppService{
    constructor(private httpClient: HttpClient) { }
    private SERVER_URL = 'http://13.127.219.224:3003/';
    
    getCountriesInfo(){
        return this.httpClient.get<{response: CountriesInfo[]}>(this.SERVER_URL+'getCountriesInfo');
    }
    // getLanguages(){
    //     return this.httpClient.get<{response: [{'_id': String, "value": String, "viewValue": String}]}>(this.SERVER_URL+'getLanguage');
    // }
    postDemoFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: String}>(this.SERVER_URL+'postDemoForm', data);
    }

    postRegistrationFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>(this.SERVER_URL+'register', data);
    }
    postLoginFormData(data: FormData){
        //API CALL
        return this.httpClient.post<{message: string, target: string}>(this.SERVER_URL+'login', data);
    }
}