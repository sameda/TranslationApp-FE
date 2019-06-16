import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HelperFunctions } from "app/helper/functions";
import { UserContext } from "app/common/user.context";


@Component({

    templateUrl: './reset-password.component.html' 
})
export class ResetPasswordComponent implements OnInit {
  
    resetPasswordForm: FormGroup
    token: string

    constructor(private fb: FormBuilder, private userService: UserService,
        private router: Router, 
        private route: ActivatedRoute) { 
            this.token = this.route.snapshot.queryParams['a']
        }
  
    ngOnInit() {
        this.initForm()
    }

    private initForm() {
        this.resetPasswordForm =   this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            rePassword: ['', [Validators.required, Validators.minLength(6)]]
          }, { validator: HelperFunctions.passwordMatcher })
    }

      
    resetPassword(){
        let resetPassword: any ={
            newPassword: this.resetPasswordForm.value.password
        }

        this.userService.resetPassword(this.token, resetPassword ).subscribe(resp=> {
            HelperFunctions.showNotification('bottom', 'right', 'Password successfully reset', 'success')
            this.router.navigate(['/login'])
        }, err => {
            let msg = "Something went wrong"; 
            if (err.detailedMessage)
              msg = err.detailedMessage
            else if(err.error.detailedMessage)
              msg = err.error.detailedMessage
            else if(err.error.error == 'Unauthorized')
              msg = "Link has expired"
            HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
        })
    }

  
}

  