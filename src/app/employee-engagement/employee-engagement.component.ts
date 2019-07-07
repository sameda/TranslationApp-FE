import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';

@Component({

  templateUrl: './employee-engagement.component.html' 
})
export class EmployeeEngagementComponent implements OnInit {
  
  public routes: RouteInfo [] = [

    { path: '/employee-engagement/', title: 'SMS',  icon: '', class: '' },
    { path: '/employee-engagement/scheduling', title: 'Dynamic scheduling',  icon: '', class: '' },
    { path: '/employee-engagement/email', title: 'Email',  icon: '', class: '' },
    { path: '/employee-engagement/feedback', title: 'Feedback',  icon: '', class: '' },
    { path: '/employee-engagement/review', title: 'Review',  icon: '', class: '' },
    { path: '/employee-engagement/trends', title: 'Trends',  icon: '', class: '' }
   
  ]
  constructor() { }

  ngOnInit() {
  }

}
