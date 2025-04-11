import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { LogoutComponent } from './screens/logout/logout.component';
import { AboutUsComponent } from './screens/site/about-us/about-us.component';
import { JobListComponent } from './screens/site/job-list/job-list.component';
import { ContactUsComponent } from './screens/site/contact-us/contact-us.component';
import { JobDetailsComponent } from './screens/site/job-details/job-details.component';
import { TeamComponent } from './screens/site/team/team.component';
import { DashboardComponent } from './screens/employee/dashboard/dashboard.component';
import { ProfileComponent } from './screens/employee/profile/profile.component';
import { ManageJobsComponent } from './screens/employee/manage-jobs/manage-jobs.component';
import { ManageCandidatesComponent } from './screens/employee/manage-candidates/manage-candidates.component';
import { CreateJobComponent } from './screens/employee/create-job/create-job.component';
import { HomeComponent as AdminHomeComponent } from './screens/employee/home/home.component';
import { LayoutComponent } from './screens/site/layout/layout.component';
import { HomeComponent } from './screens/site/home/home.component';
import { ManageCandidatesResultComponent } from './screens/employee/manage-candidates-result/manage-candidates-result.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "site/home" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent },

    // site -------------
    {
        path: "site", component: LayoutComponent, children: [
            { path: "home", component: HomeComponent },
            { path: "about-us", component: AboutUsComponent },
            { path: "contact-us", component: ContactUsComponent },
            { path: "team", component: TeamComponent },
            { path: "job-list", component: JobListComponent },
            { path: "job-details", component: JobDetailsComponent },
        ]
    },
    // admin -------------
    {
        path: "admin", component: DashboardComponent, children: [
            { path: "dashboard", component: AdminHomeComponent },
            { path: "profile", component: ProfileComponent },
            { path: "manage-jobs", component: ManageJobsComponent },
            { path: "manage-candidates", component: ManageCandidatesComponent },
            { path: "manage-candidates/result", component: ManageCandidatesResultComponent },
            { path: "create-job", component: CreateJobComponent },
        ]
    },
];
