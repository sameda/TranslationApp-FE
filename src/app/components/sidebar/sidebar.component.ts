import { Component, OnInit } from '@angular/core';
import { RouteInfo } from 'app/interface/route-info';
import { AuthenticationService } from 'app/authentication/authentication.service';

declare const $: any;
// declare interface RouteInfo {
//     path: string;
//     title: string;
//     icon: string;
//     class: string;
// }
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/customer-engagement', title: 'Customer Engagement',  icon:'group', class: '' },
    { path: '/employee-engagement', title: 'Employee Engagement',  icon:'work', class: '' },
    { path: '/review-management', title: 'Review Management',  icon:'content_paste', class: '' },
    { path: '/competitor-edge', title: 'Competitor Edge',  icon:'library_books', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/support', title: 'Support',  icon:'call', class: '' },
    { path: '/services-purchase', title: 'Services purchase',  icon:'add_shopping_cart', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logOut() {
    this.authenticationService.logout();
  }
}
