import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';

@Component({

  templateUrl: './employee-engagement.component.html' 
})
export class EmployeeEngagementComponent implements OnInit {
  
  public routes: RouteInfo [] = [
    { path: '/employee-engagement', title: 'SMS',  icon: '', class: '' },
    { path: '/employee-engagement/scheduling', title: 'Scheduling',  icon: '', class: '' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
