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
import { EmailComponent } from 'app/employee-engagement/email/email.component';
import { FeedbackComponent } from 'app/employee-engagement/feedback/feedback.component';
import { ReviewsComponent } from 'app/employee-engagement/reviews/reviews.component';
import { TrendsComponent } from 'app/employee-engagement/trends/trends.component';
import { CustomerEmailComponent } from 'app/customer-engagement/email/email.component';
import { SocialComponent } from 'app/customer-engagement/social/social.component';
import { ChatComponent } from 'app/customer-engagement/chat/chat.component';
import { PrintComponent } from 'app/customer-engagement/print/print.component';
import { CallComponent } from 'app/customer-engagement/call/call.component';
import { AIComponent } from 'app/customer-engagement/AI/ai.component';
import { InfoPageComponent } from 'app/competitor-analysis/info-page/info-page.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent,  canActivate: [AuthGuard] },
    { path: 'competitor-edge',        component: CompetitorAnalysisComponent,  canActivate: [AuthGuard],},
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
        },
        {
          path: 'email',
          component: CustomerEmailComponent
        },
        {
          path: 'social',
          component: SocialComponent
        },
        {
          path: 'chat',
          component: ChatComponent
        },
        {
          path: 'print',
          component: PrintComponent
        },
        {
          path: 'call',
          component: CallComponent
        },
        {
          path: 'ai',
          component: AIComponent
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
        },{
          path: 'email',
          component: EmailComponent
        },
        {
          path: 'feedback',
          component: FeedbackComponent
        },
        {
          path: 'review',
          component: ReviewsComponent
        },
        {
          path: 'trends',
          component: TrendsComponent
        },
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
    { path: 'competitor-edge/info-page', canActivate: [AuthGuard], component: InfoPageComponent }

];
