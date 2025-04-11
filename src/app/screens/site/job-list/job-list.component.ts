import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NotifierModule
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {

  constructor(
    private _appService: AppService,
    private _router: Router,
    private _notifierService: NotifierService
  ) {

  }

  // variables ==============================
  isJobLoading = false
  jobList: any[] = []

  // function ===============================

  initJobList() {
    this.jobList.push(
      {
        job_id: 0,
        job_compagny: "TechNova Inc.",
        job_title: "Frontend Developer",
        job_description: "We are looking for a passionate frontend developer to join our team.",
        criteriaList: [
          { title: "Experience", value: "2+ years", weight: 3, editable: true },
          { title: "Skills", value: "Angular, TypeScript, HTML, CSS", weight: 4, editable: true }
        ],
        job_available_place: 2,
        job_work_time: "Full-time",
        job_work_place: "Remote",
        job_email_address: "hr@technova.com",
        job_phone_address: "+1 555 0101",
        job_author: "Jane Doe",
        job_salary_min: 3000,
        job_salary_max: 5000,
        job_deadline: "2025-05-31",
        job_location: "San Francisco, CA"
      }
    );
    this.jobList.push(
      {
        job_id: 1,
        job_compagny: "GreenSoft Solutions",
        job_title: "Data Analyst",
        job_description: "Analyze large datasets to support decision making.",
        criteriaList: [
          { title: "Education", value: "Bachelor’s in Statistics", weight: 2, editable: true },
          { title: "Tools", value: "Python, SQL, Tableau", weight: 4, editable: true }
        ],
        job_available_place: 1,
        job_work_time: "Part-time",
        job_work_place: "On-site",
        job_email_address: "jobs@greensoft.io",
        job_phone_address: "+1 555 2020",
        job_author: "John Smith",
        job_salary_min: 2500,
        job_salary_max: 4000,
        job_deadline: "2025-06-15",
        job_location: "Berlin, Germany"
      }
    )
  }

  /**
   * Get job list from server
   */
  getJobList() {
    // test ...
    // this.initJobList()

    // start loader
    this.isJobLoading = true

    // call get job api
    this._appService.getJobList().subscribe((response: any) => {

      // stop loader
      this.isJobLoading = false;

      // get job list
      this.jobList = response

      console.log(response);

      // code ... update list
    }, (error) => {
      // stop loader
      this.isJobLoading = false;

      // log
      console.error(error);

      // notify
      this._notifierService.notify('error', 'An error occured')

    });
  }

  /**
   * Navigate to job details page
   * @param job_id 
   */
  gotoJobDetails(job_id: number) {
    this._router.navigateByUrl('/site/job-details?job_id=' + job_id)
  }

  // getUserData() {
  //   // get user data
  //   this._appService.getUserDataFromServer(this._appService.get.user_id).subscribe((res) => {

  //     // stop loader
  //     this.isLoading = false;

  //     // set user data
  //     this._appService.setUserData(res)

  //     // navigate to find job page
  //     this._router.navigateByUrl('/site/job-list')
  //   }, (error) => {
  //     // notify
  //     this._notifierService.notify('error', 'An error occured')

  //     // log
  //     console.error(error);

  //   })
  // }


  // ---------- INIT -------------

  ngOnInit() {
    this.getJobList()
  }

}
