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
  cclist: CountriesInfo[] = [];
  demoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    org: new FormControl('', Validators.required),
    ccode: new FormControl('', [Validators.required,Validators.pattern(new RegExp('^\\+[0-9]*$'))]),
    phone: new FormControl('', [Validators.required,Validators.pattern(new RegExp('^[0-9]*$'))]),
    designation: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required,Validators.email]),
    message: new FormControl('',Validators.required),  
  });
  filteredCcodeOptions: Observable<CountriesInfo[]>;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getCountriesInfo().subscribe(success=>{
      success.response.map(itm=>this.cclist.push(itm));
    },failure=>{
      this.cclist = [];
    });
    this.filteredCcodeOptions = this.demoForm.controls['ccode'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value === undefined || value === null? '':value.dial_code)),
      map(name => (name ? this._filter(name) : this.cclist.slice())),
    );
  }
  cCodeDisplayFn(countryInfo: CountriesInfo): string {
    return countryInfo && countryInfo.dial_code ? countryInfo.dial_code : '';
  }

  private _filter(name: string): CountriesInfo[] {
    const filterValue = name.toLowerCase();
    let res = this.cclist.filter(option => option.dial_code.toLowerCase().includes(filterValue)); 
    return res;
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
    formData.forEach((val,key)=>{
      console.log(key,val);
    })

    this._reset();
  }

}
