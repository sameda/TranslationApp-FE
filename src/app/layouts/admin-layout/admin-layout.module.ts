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
import { SchedulingService } from 'app/service/scheduling.service';
import { SettingsService } from 'app/service/settings.service';
import { EmailComponent } from 'app/employee-engagement/email/email.component';
import { FeedbackComponent } from 'app/employee-engagement/feedback/feedback.component';
import { ReviewsComponent } from 'app/employee-engagement/reviews/reviews.component';
import { TrendsComponent } from 'app/employee-engagement/trends/trends.component';
import { CustomerEmailComponent } from 'app/customer-engagement/email/email.component';
import { SocialComponent } from 'app/customer-engagement/social/social.component';
import { ChatComponent } from 'app/customer-engagement/chat/chat.component';
import { CallComponent } from 'app/customer-engagement/call/call.component';
import { PrintComponent } from 'app/customer-engagement/print/print.component';
import { AIComponent } from 'app/customer-engagement/AI/ai.component';
import { EmailService } from 'app/service/email.service';
import { InfoPageComponent } from 'app/competitor-analysis/info-page/info-page.component';



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
    FullCalendarModule,

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
    BadReviewComponent,
    EmailComponent,
    FeedbackComponent,
    ReviewsComponent,
    TrendsComponent,
    CustomerEmailComponent,
    SocialComponent, 
    ChatComponent,
    PrintComponent,
    CallComponent,
    AIComponent,
    InfoPageComponent

  ],
  providers: [
   UserService, TranslateService, SmsService, SchedulingService, SettingsService, EmailService
  ]
})

export class AdminLayoutModule {}
