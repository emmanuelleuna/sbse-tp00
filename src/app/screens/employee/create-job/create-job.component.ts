import { Component } from '@angular/core';
import { JobCriteria } from '../../../models/job-criteria-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../../services/app.service';
import { DatetimeService } from '../../../services/datetime.service';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NotifierModule
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {

  constructor(
    private _notifierService: NotifierService,
    private _appService: AppService,
    private _datetimeService: DatetimeService
  ) { }


  // variables =========================
  isLoading = false;
  job_compagny: string = "";
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

  /**
   * Init job criteria list
   */
  initCriteriaList() {
    // code ...
    for (let i = 1; i < 7; i++) {
      this.criteriaList.push({
        title: "Criteria " + i,
        value: "Value " + i,
        weight: 0,
        editable: false
      })
    }

  }

  /**
   * Add criteria to th end of the list
   */
  addCriteria() {
    this.criteriaList.push({
      title: "Criteria " + (this.criteriaList.length + 1),
      value: "Value " + (this.criteriaList.length + 1),
      weight: 0,
      editable: true
    })
  }

  /**
   * Remove criteria row by index
   * @param index 
   */
  removeCriteria(index: number) {
    this.criteriaList.splice(index, 1);
  }

  /**
   * Create job offer
   * @returns 
   */
  createJobOffer() {

    let data = {
      "job_compagny": this.job_compagny,
      "job_title": this.job_title,
      "job_description": this.job_description,
      "job_available_place": this.job_available_place,
      "job_work_time": this.job_work_time,
      "job_work_place": this.job_work_place,
      "job_email_address": this.job_email_address,
      "job_phone_address": this.job_phone_address,
      "job_author": this.job_author,
      "job_salary_min": this.job_salary_min,
      "job_salary_max": this.job_salary_max,
      "job_deadline": this.job_deadline,
      "criteria": this.criteriaList,
      "job_location": this.job_location
    }

    console.log(data);

    // check empty field
    if (
      !this.job_compagny.trim() ||
      !this.job_title.trim() ||
      !this.job_description.trim() ||
      this.job_available_place < 0 ||
      !this.job_work_time.trim() ||
      !this.job_work_place.trim() ||
      !this.job_email_address.trim() ||
      !this.job_phone_address.trim() ||
      !this.job_author.trim() ||
      this.job_salary_min < 0 ||
      this.job_salary_max < 0 ||
      !this.job_deadline
    ) {
      // invalied field
      this._notifierService.notify('error', "Invalid form. Please fill all fields");
      return;
    }

    // ckeck empty criteria
    this.criteriaList.map((c, index) => {
      if (!c.title.trim() || !c.value.trim() || c.weight < 0) {
        // invalid criteria
        this._notifierService.notify('error', "Invalid criteria:" + index + 1);
        return;
      }
    })

    // available place must be greather than 0
    if (this.job_available_place < 1) {
      this._notifierService.notify('error', "Available place must be greather than 0");
      return;
    }

    // Max salary amount must be greather than minimum
    if (this.job_salary_min > this.job_salary_max) {
      this._notifierService.notify('error', "Max salary amount must be greather than minimum");
      return;
    }

    // Application deadline must be greather than now (at least 24h d<ecart)
    let date1 = new Date(this.job_deadline);
    let date2 = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    if (date1 < date2) {
      this._notifierService.notify('error', "Available time for submissions must be at least 24H");
      return;
    }

    // start loading
    this.isLoading = true

    // call createjob offer api
    this._appService.createJobOffer(data).subscribe(
      (response) => {
        // stop loading
        this.isLoading = false;
        if (response.status === 'success') {
          this._notifierService.notify('success', 'Jthe job has been successfully created');

          // reset form

        } else {
          this._notifierService.notify('error', response.message);
        }
      },
      (error) => {
        // stop loading
        this.isLoading = false;
        this._notifierService.notify('error', 'An error has occurred');

        console.log(error);

      }
    );

  }

  /**
   * Reset form
   */
  resetForm() {
    this.job_title = '';
    this.job_description = '';
    this.job_available_place = 1;
    this.job_work_time = '';
    this.job_work_place = '';
    this.job_email_address = '';
    this.job_phone_address = '';
    this.job_author = '';
    this.job_salary_min = 0;
    this.job_salary_max = 0;
    this.job_deadline = this._datetimeService.formatDateToYYYYMMDD(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
    this.job_location = '';

    // init criteria list
    this.initCriteriaList()
  }


  ngOnInit() {
    this.initCriteriaList()
    console.log('init');

  }



}
