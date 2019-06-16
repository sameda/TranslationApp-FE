import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { HelperFunctions } from "app/helper/functions";

@Component({

    templateUrl: './forgot-password.component.html' 
})
export class ForgotPasswordComponent implements OnInit {
  
    forgotPasswordForm: FormGroup
    showLoading:boolean = false;

    constructor(private fb: FormBuilder, private authService: AuthenticationService,
        private router: Router) { }
  
    ngOnInit() {
        this.initForm()
    }

    private initForm() {
        this.forgotPasswordForm = this.fb.group({
          username: ["", [Validators.required]]    
    
        })
      }

      
    sendLink(){
        this.showLoading = true;
        let forgotPassword: any ={
            username: this.forgotPasswordForm.value.username
        }

        this.authService.forgotPassword(forgotPassword).subscribe(resp=> {
            this.showLoading = false;
            HelperFunctions.showNotification('bottom', 'right', 'Click the link that you just received on the email', 'success')
        }, err => {
            this.showLoading = false;
            let msg = "Something went wrong"; 
            if (err.detailedMessage)
              msg = err.detailedMessage
            // else if(err.error.detailedMessage)
            //   msg = err.error.detailedMessage
            HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
        })
    }
}

  