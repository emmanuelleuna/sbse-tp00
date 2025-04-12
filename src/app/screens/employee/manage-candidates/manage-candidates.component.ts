import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

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
  isMessageSending = false;
  isJobListLoading = false
  isSelectedCandidateDisplayed = false;
  isSelectionLoading = false;
  isJobCandidatListLoading = false
  jobList: any[] = []
  candidateList: any[] = []
  selectedCandidates: any[] = []
  selectedJob = null


  // function =============================================

  backToCandidateList() {
    this.isSelectedCandidateDisplayed = false
  }

  /**
   * Get job list from server
   */
  getJobList() {
    // code ...
    // for (let i = 0; i < 5; i++) {
    //   this.jobList.push({
    //     id: i,
    //     title: 'Job title-' + i
    //   })
    // }

    // get job list from server
    this._appService.getJobList().subscribe(
      (response) => {
        this.jobList = response
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
    // for (let i = 0; i < 20; i++) {
    //   this.candidateList.push({
    //     id: 'candidate-id-' + i,
    //     name: 'Candidate name-' + i,
    //     gender: 'Male',
    //     email: 'Candidate name-' + i,
    //     phone: 'Candidate phone-' + i
    //   })
    // }
    // call server to get job candidat list

    // start loading
    this.isJobCandidatListLoading = true

    if (this.selectedJob != null) {
      this._appService.getJobCandidatList(this.selectedJob).subscribe(
        (response) => {
          // stop loading
          this.isJobCandidatListLoading = false

          // get data
          this.candidateList = response

          // log
          console.log(response);
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

    this._appService.analyzeCandidatures(this.selectedJob).subscribe((res) => {

      // poplate selected candida
      this.selectedCandidates = res

    }, (error) => {
      console.error(error);
      this._notifierService.notify('error', 'An error occured')

    })

    // populate selectedcandidate list
    this.selectedCandidates.push([
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
    // this._router.navigateByUrl('/admin/manage-candidates/result?job_id=' + this.selectedJob)
    // dsplay selected candidate list
    this.isSelectedCandidateDisplayed = true
  }

  /**
    * Send message to selected candidates for current job
    */
  sendMessageToCandidate() {

    // call array
    let calls: Observable<any>[] = []
    this.selectedCandidates.map((c, index) => {
      let message = "Dear" + c.name + ", We are pleased to inform you that you have been selected for the[Job Title] position at[Company Name]. Your qualifications and experience stood out among the many applications we received, and we are excited about the potential you bring to our team.We will be reaching out to you shortly with further details regarding the next steps in the onboarding process.Once again, congratulations, and welcome aboard! Best regards."
      let data = {
        id_sender: 0,
        id_receiver: 1,
        message: message,
        created_at: new Date()
      }
      calls.push(this._appService.sendMessage(data))
    })

    // start loader
    this.isMessageSending = true;
    forkJoin(calls).subscribe((responses) => {
      // stop loader
      this.isMessageSending = false;
      // code ...
      // if success 
      this._notifierService.notify('success', 'Messages have been sent successfully')

    }, (errors) => {
      // stop loader
      this.isMessageSending = false;

      // notify
      this._notifierService.notify('error', 'An error occured')

      // log
      console.error(errors);

    })

  }


  ngOnInit() {
    this.getJobList()
    this.getSelectedCandidates()
  }

}
