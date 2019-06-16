import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRegisterDto, UserGetDto, UserPatchDto } from 'app/interface/user/user';
import { UserContext } from 'app/common/user.context';
import { UserService } from 'app/service/user.service';
import { HelperFunctions } from 'app/helper/functions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup
  currentUserId: number
  currentUser: UserGetDto
  showLoading = false;
  username: string;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.getUserDetails();
  }

  public getUserDetails() {
    let currentUser = new UserContext();
    this.currentUserId = currentUser.userID;
    this.userService.getUserById(this.currentUserId).subscribe(resp => {
      this.showLoading = false;
      this.username = resp.body.username
      this.currentUser = resp.body;
      this.patchForm();
    }, err => {
      this.showLoading = false;
      HelperFunctions.showNotification('bottom', 'right', "Details were not found for this user", 'danger')
    })
  
  }

  private initForm() {
    this.profileForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      // username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      companyName: ["", [Validators.required]]
    })
  }

  private patchForm() {
    this.profileForm = this.fb.group({
      firstname: [this.currentUser.firstName, [Validators.required]],
      lastname: [this.currentUser.lastName, [Validators.required]],
      // username: [this.currentUser.username, [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      phoneNumber: [this.currentUser.phoneNumber, [Validators.required]],
      companyName: [this.currentUser.companyName, [Validators.required]]
    })
  }

  public registerUser() {
    this.showLoading = true;
    let formValues = this.profileForm.value;
    const userPatchDto: UserPatchDto = {
      companyName: formValues.companyName,
      email: formValues.email,
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      phoneNumber: formValues.phoneNumber,

    }

    this.userService.updateUser(this.currentUserId, userPatchDto).subscribe(resp => {    
         HelperFunctions.showNotification('bottom', 'right', 'Successfully updated profile', 'success')
         
         this.getUserDetails();        
    }, err => {
      this.showLoading = false;
        let msg = "Something went wrong"; 
        if (err.detailedMessage)
          msg = err.detailedMessage
        else if(err.error.detailedMessage)
          msg = err.error.detailedMessage
        HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
      })
  }

}
