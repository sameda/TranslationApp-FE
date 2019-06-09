import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CustomerEngagementComponent } from 'app/customer-engagement/customer-engagement.component';
import { EmployeeEngagementComponent } from 'app/employee-engagement/employee-engagement.component';
import { ReviewManagementComponent } from 'app/review-management/review-management.component';
import { SupportComponent } from 'app/support/support.component';
import { SmsMessagesComponent } from 'app/customer-engagement/sms-messages/sms-messages.component';
import { TranslationComponent } from 'app/customer-engagement/translation/translation.component';
import { SchedulingComponent } from 'app/customer-engagement/scheduling/scheduling.component';
import { CompetitorAnalysisComponent } from 'app/competitor-analysis/competitor-analysis.component';
import { SchedulingComponent  as EmployeeSchedulingComponent } from 'app/employee-engagement/scheduling/scheduling.component';
import { SmsMessagesComponent  as EmployeeSmsComponent } from 'app/employee-engagement/sms-messages/sms-messages.component';
import { ReviewSummaryComponent } from 'app/review-management/review-summary/review-summary.component';
import { BadReviewComponent } from 'app/review-management/bad-review/bad-review.component';
import { AuthGuard } from 'app/common/guard/auth-guard';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent,  canActivate: [AuthGuard] },
    { path: 'competitor-analysis',        component: CompetitorAnalysisComponent,  canActivate: [AuthGuard] },
    { path: 'customer-engagement',        component: CustomerEngagementComponent,  canActivate: [AuthGuard], children: [
        {
          path: '',
          component: SmsMessagesComponent
        },
        {
          path: 'translation',
          component: TranslationComponent,
        },
        {
          path: 'scheduling',
          component: SchedulingComponent
        }
      ] },
    { path: 'employee-engagement',        component: EmployeeEngagementComponent ,  canActivate: [AuthGuard],  children: [
      {
        path: '',
        component: EmployeeSmsComponent
      },
      {
        path: 'scheduling',
        component: EmployeeSchedulingComponent
      }
    ] },
    { path: 'review-management',  component: ReviewManagementComponent,  canActivate: [AuthGuard], children: [
      {
        path: '',
        component: ReviewSummaryComponent
      },
      {
        path: 'bad-review',
        component: BadReviewComponent
      }
    ] },
    { path: 'support', canActivate: [AuthGuard], component: SupportComponent },


];
