import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';
import { SchedulingService } from 'app/service/scheduling.service';
import { SettingsService } from 'app/service/settings.service';
import { SettingsGetDto } from 'app/interface/settings/settings';

@Component({
  templateUrl: './customer-engagement.component.html' 
})
export class CustomerEngagementComponent implements OnInit {
  public menuReady: boolean = false;
  public routes: RouteInfo [] = [
    { path: '/customer-engagement/', title: 'SMS',  icon: '', class: '' },
    { path: '/customer-engagement/scheduling', title: 'Dynamic scheduling',  icon: '', class: '' },
    { path: '/customer-engagement/email', title: 'Email',  icon: '', class: '' },
    { path: '/customer-engagement/chat', title: 'Chat',  icon: '', class: '' },
    { path: '/customer-engagement/call', title: 'Call',  icon: '', class: '' },
    { path: '/customer-engagement/social', title: 'Social',  icon: '', class: '' },
    { path: '/customer-engagement/print', title: 'Print',  icon: '', class: '' },
    { path: '/customer-engagement/ai', title: 'AI',  icon: '', class: '' }
    // { path: '/customer-engagement/translation', title: 'Translation Services',  icon: '', class: '' },
  ]
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.getSettings();
  }

  getSettings(){
    this.settingsService.getSettings().subscribe(resp => {
      if(resp.body){
        let setting: SettingsGetDto = resp.body.find(x=>x.id == 2)
        if(setting && setting.value == true)
          this.routes.push({ path: '/customer-engagement/translation', title: 'Translation Services',  icon: '', class: '' })        
      }
      this.menuReady = true;
    }, err => {
       this.menuReady = true;
    })
  }
}
