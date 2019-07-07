import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'app/helper/constant/constants';
import { SmsService } from 'app/service/sms.service';
import { EmailService } from 'app/service/email.service';
import { HelperFunctions } from 'app/helper/functions';

@Component({

  templateUrl: './support.component.html' 
})
export class SupportComponent implements OnInit {

  ticketForm: FormGroup
  smsForm: FormGroup
  showSmsLoading: boolean;
  showEmailLoading: boolean;
  constructor(private fb: FormBuilder,
              private smsService: SmsService,
              private emailService: EmailService) { }

  ngOnInit() {
    this.initTicketForm()
    this.initSmsForm()
  }

  private initTicketForm() {
    this.ticketForm = this.fb.group({
      title: [""],
      text: ["", [Validators.required]]
    })
  }

  private initSmsForm() {
    this.smsForm = this.fb.group({
      text: ["", [Validators.required]]
    })
  }

  public sendSms() {
    this.showSmsLoading = true;
    let formValues = this.smsForm.value;
    let dto: any = {
      phoneNumber: Constants.TwilioNumber,
      text: formValues.text
    }
    this.smsService.sendSms(dto).subscribe(resp => { 
        this.showSmsLoading = false;   
         HelperFunctions.showNotification('bottom', 'right', 'Successfully sent', 'success')  
    }, err => {
        this.showSmsLoading = false;
        let msg = "Something went wrong"; 
        if (err.detailedMessage)
          msg = err.detailedMessage
        else if(err.error.detailedMessage)
          msg = err.error.detailedMessage
        HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
      })

  }

  public sendTicket(){
    this.showEmailLoading = true;
    let formValues = this.ticketForm.value;
    let dto: any = {
      email: Constants.TicketEmail,
      subject: "Ticket " + formValues.title,
      text: formValues.text
    }
    this.emailService.sendEmail(dto).subscribe(resp => { 
        this.showEmailLoading = false;   
         HelperFunctions.showNotification('bottom', 'right', 'Successfully sent', 'success')  
    }, err => {
        this.showEmailLoading = false;
        let msg = "Something went wrong"; 
        if (err.detailedMessage)
          msg = err.detailedMessage
        else if(err.error.detailedMessage)
          msg = err.error.detailedMessage
        HelperFunctions.showNotification('bottom', 'right', msg, 'danger')
      })
  }
}
