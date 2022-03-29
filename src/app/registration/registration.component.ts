import { Component, OnInit } from '@angular/core';
import { CountriesInfo } from '../model/countries.model';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  providers: [AppService]
})
export class RegistrationComponent implements OnInit {
  
  demoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required,Validators.email]),
    message: new FormControl('',Validators.required),  
  });
  success: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    
  }
  
  private _reset(): void {
    this.demoForm.reset();
    Object.keys(this.demoForm.controls).forEach(key => {
      this.demoForm.get(key).setErrors(null) ;
    });
  }
  private _createFormData(): FormData{
    const formData = new FormData();
    Object.keys( this.demoForm.controls).forEach(key => {
    formData.append(key, this.demoForm.get(key).value);  
   });
    return formData;
  }
  submit(): void {
    if (!this.demoForm.valid) {
      return;
    }
    
    const formData = this._createFormData();
    //API CALL STARTS
    // formData.forEach((val,key)=>{
    //   console.log(key,val);
    // })
    this.appService.postDemoFormData(formData).subscribe((success)=>{
      console.log(success.message);
      this.success = true;
      
    },(failure)=>{
      console.log("failed");
      }
    );
    
    
    
    this._reset();
  }

}
