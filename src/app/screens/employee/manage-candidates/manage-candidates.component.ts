import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-candidates',
  standalone: true,
  imports: [
    CommonModule,
    NotifierModule,
    FormsModule
  ],
  templateUrl: './manage-candidates.component.html',
  styleUrl: './manage-candidates.component.css'
})
export class ManageCandidatesComponent {

  constructor(
    private _appService: AppService,
    private _router: Router,
    private _notifierService: NotifierService
  ) {

  }

  // variables ============================================
  isJobListLoading = false
  isSelectionLoading = false;
  isJobCandidatListLoading = false
  jobList: any[] = []
  candidateList: any[] = []
  selectedCandidat: any[] = []
  selectedJob = null


  // function =============================================

  /**
   * Get job list from server
   */
  getJobList() {
    // code ...
    for (let i = 0; i < 5; i++) {
      this.jobList.push({
        id: i,
        title: 'Job title-' + i
      })
    }

    // get job list from server
    this._appService.getJobList().subscribe(
      (response) => {
        this.jobList = response.data
      },
      (error) => {
        console.log(error)
      }
    );
  }

  /**
   * Get job candidates list
   */
  getJobCandidatList() {
    // code ...
    for (let i = 0; i < 20; i++) {
      this.candidateList.push({
        id: 'candidate-id-' + i,
        name: 'Candidate name-' + i,
        gender: 'Male',
        email: 'Candidate name-' + i,
        phone: 'Candidate phone-' + i
      })
    }
    // call server to get job candidat list

    // start loading
    this.isJobCandidatListLoading = true

    if (this.selectedJob != null) {
      this._appService.getJobCandidatList(this.selectedJob).subscribe(
        (response) => {
          // stop loading
          this.isJobCandidatListLoading = false

          // get data
          this.candidateList = response.data

        },
        (error) => {
          // stop loading
          this.isJobCandidatListLoading = false

          // show notification
          this._notifierService.notify('error', 'An error occured');
          console.log(error)
        }
      );
    }

  }

  getSelectedCandidates() {
    // code ...
  }

  startSelection() {
    // code ...
    this.isSelectionLoading = true

    // populate selectedcandidate list
    this.selectedCandidat.push([
      {
        url: "http:...",
        name: "Jhon Cater",
        gender: "Male",
        email: "jhoncarter@gmail.com",
        phone: "650 503 478"
      },
      {
        url: "http:...",
        name: "Jhon Cater",
        gender: "Male",
        email: "jhoncarter@gmail.com",
        phone: "650 503 478"
      },
    ])

  }

  /**
   * Navigate to show result page
   */
  gotoresultPage() {
    this._router.navigateByUrl('/admin/manage-candidates/result?job_id=' + this.selectedJob)
  }

  ngOnInit() {
    this.getJobList()
    this.getSelectedCandidates()
  }

}
