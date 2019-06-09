import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators, EmailValidator, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UserRegisterDto } from '../../interface/user/user';
import { HelperFunctions } from 'app/helper/functions';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  let password = c.get('password');
  let confirmpassword = c.get('rePassword');
  if (password.pristine || confirmpassword.pristine) {
    return null;
  }
  if (password.value === confirmpassword.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.registerForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]]
      }, { validator: passwordMatcher }),

    })
  }

  public registerUser() {
    let formValues = this.registerForm.value;
    const userRegisterDto: UserRegisterDto = {
      companyName: formValues.companyName,
      email: formValues.email,
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      password: formValues.passwordGroup.password,
      phoneNumber: formValues.phoneNumber,
      username: formValues.username
    }

    this.authService.register(userRegisterDto).subscribe(resp => {    
         HelperFunctions.showNotification('bottom', 'right', 'Successfully registered', 'success')
         this.router.navigate(['/login'])      
    }, err => {
        let msg = "Something went wrong"; 
        if (err.detailedMessage)
          msg = err.detailedMessage
        else if(err.error.detailedMessage)
          msg = err.error.detailedMessage
        HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
      })
  }



}
