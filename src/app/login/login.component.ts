import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [AppService]
})
export class LoginComponent implements OnInit {
  message: string;
  link: string;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required) 
  });
  constructor(private appService: AppService, private _router: Router) { }

  ngOnInit(): void {
  }
  private _createFormData(): FormData{
    const formData = new FormData();
    Object.keys( this.loginForm.controls).forEach(key => {
      formData.append(key, this.loginForm.get(key).value);
   });
    return formData;
  }
  submit(): void{
    if (!this.loginForm.valid) {
      return;
    }
    
    const formData = this._createFormData();
    formData.forEach((val,key)=>{
      console.log(key,val);
    })
    this.appService.postLoginFormData(formData).subscribe((success)=>{
      console.log(success);
      switch (success.target){
        case '/map-ui':
          this._router.navigate(['map-ui']);
          break;
      }
    },(fail)=>{
      switch(fail.error.target){
        case 'no_user_exists':
          this.message = "No User Exists for the provided username and password combination. Please Register";
          this.link = "http://13.127.219.224:3003/register";
          break;
        case 'wrong_password':
          this.message = "Entered Password is Incorrect";
          this.link = undefined;
          break;
      }
    })
  }
}
