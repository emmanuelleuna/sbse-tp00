import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router, RouterModule } from '@angular/router';
import { DatetimeService } from '../../../services/datetime.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { JobCriteria } from '../../../models/job-criteria-item';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NotifierModule
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {

  constructor(
    private _appService: AppService,
    private _router: Router,
    protected _datetimeService: DatetimeService,
    private _notifierService: NotifierService
  ) { }

  // variables ===============================
  is_user_connected = true;
  isApplying = false;
  applied = false;
  josb: any = {}
  cv: any = null;
  fileName = '';

  job_title: string = "";
  job_description: string = "";
  criteriaList: JobCriteria[] = [];
  job_available_place = 1
  job_work_time = "Part Time"
  job_work_place = "On-site"
  job_email_address = "";
  job_phone_address = "";
  job_author = "";
  job_salary_min: number = 0;
  job_salary_max: number = 0;
  job_deadline: string = this._datetimeService.formatDateToYYYYMMDD(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
  job_location: string = "";


  // function ================================

  /**
   * Handle file selection
   * @param event 
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.cv = file

      console.log('file uploaded');

    }
  }

  /**
   * Apply to job
   */
  apply() {

    // Check if cv upload
    if (this.cv) {
      const formData = new FormData();
      formData.append("cv", this.cv);
      formData.append("id_job_offer", '0');

      this._appService.applyToJob(formData).subscribe((response) => {
        // code ...
        // stop loading
        this.isApplying = false

        // set appplied
        this.applied = true
      }, (error) => {
        // stop loading
        this.isApplying = false

        // notify
        this._notifierService.notify('Error', 'An error occured.');

        // log
        console.log(error);

      });


    } else {
      this._notifierService.notify('Error', 'Please upload your cv');
    }



  }

  /**
   * Get job details from server
   */
  getJobDetails() {
    // code ...
    this.job_title = "Marketing Executive";
    this.job_description = `We are looking for a talented Marketing Executive to undertake marketing projects for the benefit of our company. You will organize creative campaigns and promotional events that can make a difference for our company’s success according to trends and customer requirements.

The ideal candidate will be passionate for the “art” of marketing and will have an abundance of ideas for building efficient strategies. He/she must bring forth a strong arsenal of techniques and methods to promote our products, services and public image.

The goal is to reach out to the market and cultivate the customer’s interest in our products and services in ways that strengthen our reputation and facilitate our continuous growth.

`;
    for (let i = 1; i < 7; i++) {
      this.criteriaList.push({
        title: "Criteria " + i,
        value: "Value " + i,
        weight: 0,
        editable: false
      })
    }
    this.job_available_place = 2;
    this.job_work_time = "Part Time";
    this.job_work_place = "On-site";
    this.job_email_address = "google@gmail.com";
    this.job_phone_address = "+237 650 50 60 61";
    this.job_author = "Neymar Junior";
    this.job_salary_min = 40;
    this.job_salary_max = 100;
    this.job_deadline = this._datetimeService.formatDateToYYYYMMDD(
      new Date()
    );
    this.job_location = "Nkoabang, 10e Arrêt";
  }

  ngOnInit(): void {

    this.getJobDetails()
  }


}
