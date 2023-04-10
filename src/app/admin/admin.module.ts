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



@NgModule({
  declarations: [
    ProjectsListComponent,
    TeamspaceDashboardComponent,
    BugDashboardComponent,
    ProjectDashboardComponent,
    ReportsDashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AdminModule { }
