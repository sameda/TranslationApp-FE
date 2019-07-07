import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';

@Component({

  templateUrl: './review-management.component.html' 
})
export class ReviewManagementComponent implements OnInit {
  
  public routes: RouteInfo [] = [
    { path: '/review-management', title: 'Reviews',  icon: '', class: '' },
    { path: '/review-management/bad-review', title: 'Bad Review Management',  icon: '', class: '' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
