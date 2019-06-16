import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmsService } from 'app/service/sms.service';
import { SmsLog, SmsLogPaginationData } from 'app/interface/sms/smsLog';
import { GoogleLanguages } from 'app/helper/constant/languages';



@Component({
  templateUrl: './sms-messages.component.html' 
})

export class SmsMessagesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  smsLogs: SmsLog [];
  smsLogsPaginationData: SmsLogPaginationData;
  showLoading: boolean = true;
  languages = GoogleLanguages;

  constructor(private smsService: SmsService) { }

  ngOnInit() {
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
      columns: [{data:'createdDate', searchable:false, orderable:false},{ data: 'createdDate' }, { data: 'twilioId' }, { data: 'phoneNumber' },{data:'languageCode', searchable:false, orderable:false}, { data: 'languageCode' }, { data: 'text' }]
    };
  }

  getLanguage(languageCode){
    var language =  this.languages.find(lang => lang[1].toLowerCase() == languageCode.toLowerCase());
    if(language)
      return language[0]
    return "";
  }

  parseQueryData(dataTablesParameters: any){

    var queryData = "";
    let  columns = this.dtOptions.columns;
    console.log(columns)

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

}
