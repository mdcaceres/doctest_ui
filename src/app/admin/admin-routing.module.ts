import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { TeamspaceDashboardComponent } from './components/teamspace/teamspace-dashboard/teamspace-dashboard.component';
import { ReportsDashboardComponent } from './components/reports/reports-dashboard/reports-dashboard.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProjectDashboardComponent } from './components/project/project-dashboard/project-dashboard.component';
import { CreateTestComponent } from './components/test/create-test/create-test.component';
import { SuiteListComponent } from './components/suite/components/suite-list/suite-list.component';
import { TestListComponent } from './components/test/components/test-list/test-list.component';
import { BugListComponent } from './components/bug/components/bug-list/bug-list.component';
import { CreateBugComponent } from './components/bug/components/create-bug/create-bug.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path:'teamspace', component: TeamspaceDashboardComponent},
      {path:'bugs', component: BugListComponent},
      {path:'reports', component: ReportsDashboardComponent},
      {path:'project/:id', component: ProjectDashboardComponent},
      {path:'project/:id/new_test', component: CreateTestComponent},
      {path:'project/:id/suites', component: SuiteListComponent},
      {path:'project/:id/tests', component: TestListComponent},
      {path:'project/:id/bugs', component: BugListComponent},
      {path:'project/:id/new_bug', component: CreateBugComponent},
      {path: 'projects', component: ProjectsListComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
