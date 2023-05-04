import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { TeamspaceDashboardComponent } from './components/teamspace/teamspace-dashboard/teamspace-dashboard.component';
import { BugDashboardComponent } from './components/bug/bug-dashboard/bug-dashboard.component';
import { ReportsDashboardComponent } from './components/reports/reports-dashboard/reports-dashboard.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProjectDashboardComponent } from './components/project/project-dashboard/project-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path:'teamspace', component: TeamspaceDashboardComponent},
      {path:'bugs', component: BugDashboardComponent},
      {path:'reports', component: ReportsDashboardComponent},
      {path:'project/:id', component: ProjectDashboardComponent},
      {path: 'projects', component: ProjectsListComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
