import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';

@Component({
  templateUrl: './customer-engagement.component.html' 
})
export class CustomerEngagementComponent implements OnInit {

  public routes: RouteInfo [] = [
    { path: '/customer-engagement', title: 'SMS',  icon: '', class: '' },
    { path: '/customer-engagement/translation', title: 'Translation Services',  icon: '', class: '' },
    { path: '/customer-engagement/scheduling', title: 'Scheduling',  icon: '', class: '' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
