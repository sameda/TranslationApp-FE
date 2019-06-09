import { Component, OnInit, Input } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';
import { Location } from '@angular/common'
@Component({

  selector: 'inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.css']
})
export class InnerNavbarComponent implements OnInit {

  @Input() menuItems: RouteInfo[] 

  constructor() {

   }

  ngOnInit() {
  }

  
}
