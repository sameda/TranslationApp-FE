import { Component, OnInit, ElementRef } from '@angular/core';
import { ServiceDto } from 'app/interface/payment/service';
import { ModuleEnumeration } from 'app/helper/enumeration/module-enum';
declare var $: any;
@Component({

  templateUrl: './services-purchase.component.html' 
})
export class ServicesPurchaseComponent implements OnInit {

  public serviceList: ServiceDto [] = []
  public customerServices: ServiceDto [] = []
  public employeeServices: ServiceDto [] = []
  public reviewServices: ServiceDto [] = []
  public competitorServices: ServiceDto [] = []
  public selectedServices: ServiceDto[] = []
  public total: number = 0;
  public sidebarOpen: boolean = false;
  public checkout: boolean = false;
  constructor( private element: ElementRef,) { }

  ngOnInit() {
    this.getServicesList();
    this.getSeparateLists();    

  }

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
    $('#sidebar').toggleClass('active');
  }

  getServicesList() {
    this.serviceList = [
      {
        id: 1, name: 'Item 1', price: 100, module: 1
      },
      {
        id: 2, name: 'Item 2',  price: 100, module: 1
      },
      {
        id: 3, name: 'Item 3',  price: 100, module: 1
      },
      {
        id: 4, name: 'Item 4',  price: 100, module: 1
      },
      //
      {
        id: 5, name: 'Item 1', price: 200, module: 2
      },
      {
        id: 6, name: 'Item 2',  price: 200, module: 2
      },
      {
        id: 7, name: 'Item 3',  price: 200, module: 2
      },
      {
        id: 8, name: 'Item 4',  price: 200, module: 2
      },
      //
      {
        id: 9, name: 'Item 1', price: 200, module: 3
      },
      {
        id: 10, name: 'Item 2',  price: 200, module: 3
      },
      {
        id: 11, name: 'Item 3',  price: 200, module: 3
      },
      {
        id: 12, name: 'Item 4',  price: 200, module: 3
      },
       //
      {
        id: 13, name: 'Item 1', price: 200, module: 4
      },
      {
        id: 14, name: 'Item 2',  price: 200, module: 4
      },
    ]
  }

  getSeparateLists() {
    this.customerServices = this.serviceList.filter(x => x.module == ModuleEnumeration.CustomerEngagement)
    this.employeeServices = this.serviceList.filter(x => x.module == ModuleEnumeration.EmployeeEngagement)
    this.reviewServices = this.serviceList.filter(x => x.module == ModuleEnumeration.ReviewManagement)
    this.competitorServices = this.serviceList.filter(x => x.module == ModuleEnumeration.CompetitiveEdge)
  }

  addItem(item: ServiceDto) {
    item.selected = true;
    this.selectedServices.push(item);
    this.calculateTotal();
    if(this.sidebarOpen == false)
      this.toggleSidebar();
  }

  removeItem(item: ServiceDto){    
    const index = this.selectedServices.indexOf(item);
    if(index != -1)
      this.selectedServices.splice(index,1);
    if(item.module == ModuleEnumeration.CustomerEngagement)
      this.customerServices.find(x => x.id == item.id).selected = false;
    if(item.module == ModuleEnumeration.EmployeeEngagement)
      this.employeeServices.find(x => x.id == item.id).selected = false;
    if(item.module == ModuleEnumeration.ReviewManagement)
      this.reviewServices.find(x => x.id == item.id).selected = false;
    if(item.module == ModuleEnumeration.CompetitiveEdge)
      this.competitorServices.find(x => x.id == item.id).selected = false;
    this.calculateTotal();
  }


  calculateTotal() {
      this.total = 0;
      this.selectedServices.forEach(element => {
        this.total += element.price;
      })
      if(this.total == 0 && this.sidebarOpen == true)
      this.toggleSidebar();
  }

  goToCheckout(){
    this.checkout = true;
  }

  goToOrder(){
    this.checkout =  false;
    this.sidebarOpen = false;
  }
  goToPaypal(){
    window.open('https://www.paypal.com/', '_blank');
  }
 

}
