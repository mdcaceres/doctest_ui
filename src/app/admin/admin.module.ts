import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { TeamspaceDashboardComponent } from './components/teamspace/teamspace-dashboard/teamspace-dashboard.component';
import { BugDashboardComponent } from './components/bug/bug-dashboard/bug-dashboard.component';
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
import { MatOption, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from './service/user.service';
import { InvitationService } from './service/invitation.service';
import { MessagingService } from '../service/messaging.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserNamePipe } from './pipes/username';
import { CreateTestComponent } from './components/test/create-test/create-test.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    ProjectsListComponent,
    TeamspaceDashboardComponent,
    BugDashboardComponent,
    ProjectDashboardComponent,
    ReportsDashboardComponent,
    HomeComponent,
    CreateProjectComponent,
    ProjectInvitationComponent,
    UserNamePipe,
    CreateTestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    ProjectService,
    UserService,
    InvitationService,
    MessagingService
  ]
})
export class AdminModule { }
