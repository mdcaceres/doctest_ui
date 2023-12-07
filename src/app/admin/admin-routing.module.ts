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
import { TestExecutionComponent } from './components/execution/components/test-execution/test-execution.component';
import { InLoggedInGuard } from '../auth/guards/in-logged-in.guard';
import { HasRoleGuard } from '../auth/guards/has-role.guard';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path:'teamspace', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN"]}, component: TeamspaceDashboardComponent},
      {path:'bugs', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]}, component: BugListComponent},
      {path:'project/:id', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]}, component: ProjectDashboardComponent},
      {path:'project/:id/new_test', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER"]}, component: CreateTestComponent},
      {path:'project/:id/suites', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]}, component: SuiteListComponent},
      {path:'project/:id/tests', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]}, component: TestListComponent},
      {path:'project/:id/bugs', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]},  component: BugListComponent},
      {path:'project/:id/new_bug', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER"]}, component: CreateBugComponent},
      {path:'project/:id/reports', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["CLIENT"]}, component: ReportsDashboardComponent},
      {path: 'projects',canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER" , "ADMIN", "CLIENT"]},  component: ProjectsListComponent},
      {path: 'test/:id/execution', canActivate:[InLoggedInGuard,HasRoleGuard], data: {allowedRoles:["TESTER"]}, component: TestExecutionComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
