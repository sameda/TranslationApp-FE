import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmsService } from 'app/service/sms.service';
import { SmsLog, SmsLogPaginationData } from 'app/interface/sms/smsLog';
import { GoogleLanguages } from 'app/helper/constant/languages';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HelperFunctions } from 'app/helper/functions';
import { BulkSmsDto } from 'app/interface/sms/bulkSms';
import { SettingsService } from 'app/service/settings.service';
import { SettingsGetDto } from 'app/interface/settings/settings';



@Component({
  templateUrl: './sms-messages.component.html' 
})

export class SmsMessagesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  smsLogs: SmsLog [];
  smsLogsPaginationData: SmsLogPaginationData;
  showLoading: boolean = true;
  languages = GoogleLanguages;
  sendBulkSmsForm: FormGroup;
  showBulkCapability: boolean = false;

  constructor(private fb: FormBuilder, private smsService: SmsService,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.getSettings()   
    this.initTable();
  }

  getSettings(){
    this.settingsService.getSettings().subscribe(resp => {
      if(resp.body){
        let setting: SettingsGetDto = resp.body.find(x=>x.id == 1)
        if(setting && setting.value == true){
          this.initForm();
          this.showBulkCapability = true;
        }       
      }
    })
  }

  initTable(){
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 2,
      serverSide: true,
      processing: true,
      info: false,
      lengthMenu: [5, 10, 20],
      ajax: (dataTablesParameters: any, callback) => {
        const queryData = this.parseQueryData(dataTablesParameters);
        that.smsService.getSmsLogs(queryData)
          .subscribe(resp => {
            this.showLoading = false;
            that.smsLogs = resp.body.data;
            that.smsLogsPaginationData = resp.body
            callback({
              recordsTotal: resp.body.totalElements,
              recordsFiltered: resp.body.totalElements,
              data: []
            });
          }, err => {
            this.showLoading = false;
          });
      },
      columns: [{data:'createdDate', searchable:false, orderable:false},{ data: 'createdDate' }, { data: 'twilioId' }, { data: 'phoneNumber' },{data:'languageCode', searchable:false, orderable:false}, { data: 'languageCode' }, { data: 'text' }, {data: 'fromPhoneNumber'}, {data: 'serviceId'}]
    };
  }

  getLanguage(languageCode){
    if(!languageCode)
      return ""
    var language =  this.languages.find(lang => lang[1].toLowerCase() == languageCode.toLowerCase());
    if(language)
      return language[0]
    return "";
  }

  parseQueryData(dataTablesParameters: any){

    var queryData = "";
    let  columns = this.dtOptions.columns;
    // console.log(columns)

    const pageSize = dataTablesParameters.length;
    const fromRecords = dataTablesParameters.start;
    const filterByExample = dataTablesParameters.search.value;


    queryData = "?pageSize="+ pageSize + '&fromRecords=' + fromRecords
    if(filterByExample)
      queryData += "&filterByExample=" + filterByExample;
    
    if(dataTablesParameters.order[0]) {

      const sortColumnIndex = dataTablesParameters.order[0].column
      const sortDirection = dataTablesParameters.order[0].dir
      const sortColumnName = columns[sortColumnIndex].data;
      if(sortDirection == 'asc')
        queryData += "&sort=" + sortColumnName
      else if(sortDirection == 'desc')
        queryData += "&sort=-" + sortColumnName
        
    }
    return queryData;
   
  }

  // send bulk sms section
  private initForm() {
    this.sendBulkSmsForm = this.fb.group({
      phoneNumbers: this.fb.array([this.initNewNumber()]),
      text: ["", [Validators.required]]
    })
  }

  private initNewNumber(): FormGroup {
    return this.fb.group({
        phoneNumber: ["", [Validators.required]],
    })
  }
  public sendSms() {
    this.showLoading = true;
    let formValues = this.sendBulkSmsForm.value;
    let phoneNumbers: Array<string> = formValues.phoneNumbers.map(x => x.phoneNumber);
    const dto: BulkSmsDto = {
      text: formValues.text,   
      phoneNumbers: phoneNumbers,

    }
    this.smsService.sendBulkSms(dto).subscribe(resp => { 
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

  public addNewNumber() {
    (this.sendBulkSmsForm.controls.phoneNumbers as FormArray).push(this.initNewNumber());
  }

  public removeNumber(index) {
    (this.sendBulkSmsForm.controls.phoneNumbers as FormArray).removeAt(index);
  }

}
