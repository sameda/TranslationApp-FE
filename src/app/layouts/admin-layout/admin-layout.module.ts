import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';
import { CustomerEngagementComponent } from 'app/customer-engagement/customer-engagement.component';
import { EmployeeEngagementComponent } from 'app/employee-engagement/employee-engagement.component';
import { ReviewManagementComponent } from 'app/review-management/review-management.component';
import { SupportComponent } from 'app/support/support.component';
import { ComponentsModule } from 'app/components/components.module';
import { TranslationComponent } from 'app/customer-engagement/translation/translation.component';
import { SchedulingComponent } from 'app/customer-engagement/scheduling/scheduling.component';
import { SmsMessagesComponent } from 'app/customer-engagement/sms-messages/sms-messages.component';
import { CompetitorAnalysisComponent } from 'app/competitor-analysis/competitor-analysis.component';
import { SchedulingComponent  as EmployeeSchedulingComponent } from 'app/employee-engagement/scheduling/scheduling.component';
import { SmsMessagesComponent  as EmployeeSmsComponent } from 'app/employee-engagement/sms-messages/sms-messages.component';
import { ReviewSummaryComponent } from 'app/review-management/review-summary/review-summary.component';
import { BadReviewComponent } from 'app/review-management/bad-review/bad-review.component';
import { UserService } from 'app/service/user.service';
import { TranslateService } from 'app/service/translate.service';
import { DataTablesModule } from 'angular-datatables';
import { SmsService } from 'app/service/sms.service';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ComponentsModule,
    DataTablesModule,
    FullCalendarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CustomerEngagementComponent,
    EmployeeEngagementComponent,
    ReviewManagementComponent,
    SupportComponent,
    CompetitorAnalysisComponent,
    SmsMessagesComponent,
    TranslationComponent,
    SchedulingComponent,
    EmployeeSchedulingComponent,
    EmployeeSmsComponent,
    ReviewSummaryComponent,
    BadReviewComponent
  ],
  providers: [UserService, TranslateService, SmsService]
})

export class AdminLayoutModule {}
