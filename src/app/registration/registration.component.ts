import { Component, OnInit } from '@angular/core';
import { CountriesInfo } from '../model/countries.model';
import { AppService } from '../app.service';
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
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getCountriesInfo().subscribe(success=>{
      success.response.map(itm=>this.cclist.push(itm));
    },failure=>{
      this.cclist = [];
    });
  }

}
