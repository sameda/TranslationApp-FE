import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperFunctions } from 'app/helper/functions';
import { TranslateService } from 'app/service/translate.service';
import { GoogleLanguages } from 'app/helper/constant/languages';

@Component({
  templateUrl: './translation.component.html' 
})
export class TranslationComponent implements OnInit {

  translationForm: FormGroup
  selectedLanguage = null;
  allLanguages = GoogleLanguages;
  languages = this.allLanguages;
  showLoading = false;

  constructor(private fb: FormBuilder
             , private translateService: TranslateService) { }

  ngOnInit() {
    this.initForm();
  }

  setLanguage(lang: any) {
    this.selectedLanguage = lang
  }

  private initForm() {
    this.translationForm = this.fb.group({
      phoneNumber: ["", [Validators.required]],
      text: ["", [Validators.required]]
    })
  }

  public translateAndSend() {
    this.showLoading = true;
    let formValues = this.translationForm.value;
    const dto: any = {
      language: this.selectedLanguage[1],
      text: formValues.text,   
      phoneNumber: formValues.phoneNumber,

    }
    this.translateService.translateAndSendSms(dto).subscribe(resp => { 
        this.showLoading = false;   
         HelperFunctions.showNotification('bottom', 'right', 'Successfully sent', 'success')  
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

  languageChanged(event) {
    this.languages = this.allLanguages.filter(lang => lang[0].toLowerCase().includes(event.target.value.toLowerCase()))
  }

}
