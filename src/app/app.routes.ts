import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { LogoutComponent } from './screens/logout/logout.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { JobListComponent } from './screens/job-list/job-list.component';
import { ContactUsComponent } from './screens/contact-us/contact-us.component';
import { JobDetailsComponent } from './screens/job-details/job-details.component';
import { TeamComponent } from './screens/team/team.component';
import { DashboardComponent } from './screens/employee/dashboard/dashboard.component';
import { ProfileComponent } from './screens/employee/profile/profile.component';
import { ManageJobsComponent } from './screens/employee/manage-jobs/manage-jobs.component';
import { ManageCandidatesComponent } from './screens/employee/manage-candidates/manage-candidates.component';
import { CreateJobComponent } from './screens/employee/create-job/create-job.component';
import { HomeComponent } from './screens/employee/home/home.component';

export const routes: Routes = [
    // jobseeker ------------
    { path: "", pathMatch: "full", redirectTo: "admin/dashboard" },
    // { path: "home", component: HomeComponent },
    // { path: "login", component: LoginComponent },
    // { path: "register", component: RegisterComponent },
    // { path: "logout", component: LogoutComponent },
    // { path: "about-us", component: AboutUsComponent },
    // { path: "contact-us", component: ContactUsComponent },
    // { path: "job-list", component: JobListComponent },
    // { path: "job-details", component: JobDetailsComponent },
    // { path: "team", component: TeamComponent },

    // admin -------------
    {
        path: "admin", component: DashboardComponent, children: [
            { path: "dashboard", component: HomeComponent },
            { path: "profile", component: ProfileComponent },
            { path: "manage-jobs", component: ManageJobsComponent },
            { path: "manage-candidates", component: ManageCandidatesComponent },
            { path: "create-job", component: CreateJobComponent },
        ]
    },
];
