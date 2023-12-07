import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { TeamspaceDashboardComponent } from './components/teamspace/teamspace-dashboard/teamspace-dashboard.component';
import { ProjectDashboardComponent } from './components/project/project-dashboard/project-dashboard.component';
import { ReportsDashboardComponent } from './components/reports/reports-dashboard/reports-dashboard.component';
import { HomeComponent } from './components/home/home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectService } from './service/project.service';
import { ProjectInvitationComponent } from './components/project/project-invitation/project-invitation.component';
import { DateAdapter, MatOption, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from './service/user.service';
import { InvitationService } from './service/invitation.service';
import { MessagingService } from '../service/messaging.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserNamePipe } from './pipes/username';
import { CreateTestComponent } from './components/test/create-test/create-test.component';
import {MatTableModule} from '@angular/material/table';
import { QuillModule } from 'ngx-quill';
import { QuillMaterialComponent } from './components/quill/quill-material/quill-material.component';
import { CreateSuiteComponent } from './components/suite/create/create-suite/create-suite.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CreateClientComponent } from './components/client/components/create-client/create-client.component';
import { SuiteListComponent } from './components/suite/components/suite-list/suite-list.component';
import { TestListComponent } from './components/test/components/test-list/test-list.component';
import { CreateBugComponent } from './components/bug/components/create-bug/create-bug.component';
import { BugListComponent } from './components/bug/components/bug-list/bug-list.component';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TestExecutionComponent } from './components/execution/components/test-execution/test-execution.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NgChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';

import { HealtReportComponent } from './components/reports/reports-dashboard/components/healt-report/healt-report.component';
import { LineChartComponent } from './components/reports/reports-dashboard/components/line-chart/line-chart.component';
import { TimeLineComponent } from './components/reports/reports-dashboard/components/time-line/time-line.component';
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DynamicChartComponent } from './components/reports/reports-dashboard/dynamic-chart/dynamic-chart.component';


@NgModule({
  declarations: [
    ProjectsListComponent,
    TeamspaceDashboardComponent,
    ProjectDashboardComponent,
    ReportsDashboardComponent,
    HomeComponent,
    CreateProjectComponent,
    ProjectInvitationComponent,
    UserNamePipe,
    SafeHtmlPipe,
    CreateTestComponent,
    QuillMaterialComponent,
    CreateSuiteComponent,
    CreateClientComponent,
    SuiteListComponent,
    TestListComponent,
    CreateBugComponent,
    BugListComponent,
    SafeHtmlPipe,
    TestExecutionComponent,
    HealtReportComponent,
    LineChartComponent,
    TimeLineComponent,
    TermsAndConditionComponent,
    DynamicChartComponent
  ],
  imports: [
    NgChartsModule,
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    QuillModule.forRoot()
  ],
  providers: [
    ProjectService,
    UserService,
    InvitationService,
    MessagingService,
    DatePipe
  ]
})
export class AdminModule { }
