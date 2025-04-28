import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { SelectedCandidateCardComponent } from "../../../components/selected-candidate-card/selected-candidate-card.component";

@Component({
  selector: 'app-manage-candidates',
  standalone: true,
  imports: [
    CommonModule,
    NotifierModule,
    FormsModule,
    SelectedCandidateCardComponent
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
  isSelectedCandidateDisplayed = true;
  isSelectionLoading = false;
  isJobCandidatListLoading = false
  jobList: any[] = []
  candidateList: any[] = []
  selectedCandidates: any[] = []
  selectedJob: any = null
  job_title = ''

  // --- finalist info
  all_finalist: any[] = [];
  real_finalist: any[] = [];
  abstract_finalist: any[] = [];
  selected_finalist: any[] = [];
  rest_of_finalist: any[] = [];



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

  getSelcetedCandidate<T>(array: T[]): T[] {
    // Copie du tableau pour ne pas modifier l'original
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Génère un index aléatoire
      const j = Math.floor(Math.random() * (i + 1));
      // Échange des éléments
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  startSelection() {
    // start loading ...
    this.isSelectionLoading = true
    this._appService.analyzeCandidatures(Number.parseInt(this.selectedJob)).subscribe((res) => {

      console.log(res);

      // get finalist info
      this.all_finalist = res.finalists_with_info

      // code ...
      this.isSelectionLoading = false;

    }, (error) => {

      // poplate selected candida

      // stop loading
      this.isSelectionLoading = false

      // log
      // console.error(error);

      // notify
      // this._notifierService.notify('error', 'An error occured')

    })

    // populate selectedcandidate list
    // this.selectedCandidates.push([
    //   {
    //     url: "http:...",
    //     name: "Jhon Cater",
    //     gender: "Male",
    //     email: "jhoncarter@gmail.com",
    //     phone: "650 503 478"
    //   },
    //   {
    //     url: "http:...",
    //     name: "Jhon Cater",
    //     gender: "Male",
    //     email: "jhoncarter@gmail.com",
    //     phone: "650 503 478"
    //   },
    // ])

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
    let message = "Dear Applicant, We are pleased to inform you that you have been selected for the .... job"

    this.isMessageSending = true;

    this._appService.sendMessage(message).subscribe((res) => {

      // 
      this.isMessageSending = false

      //
      this._notifierService.notify('success', 'Messages have been sent successfully')

    }, (error) => {
      this.isMessageSending = false

      this._notifierService.notify('error', 'An error occured')

    })
    // this.selectedCandidates.slice(0, 1).map((c, index) => {
    // let message = "Dear" + c.name + ", We are pleased to inform you that you have been selected for the .... job"
    // let data = {
    //   id_sender: 0,
    //   id_receiver: 1,
    //   message: message,
    //   created_at: new Date()
    // }
    // calls.push(this._appService.sendMessage(message))
    // })

    // start loader
    // this.isMessageSending = true;
    // forkJoin(calls).subscribe((responses) => {
    //   // stop loader
    //   this.isMessageSending = false;
    //   // code ...
    //   // if success 
    //   this._notifierService.notify('success', 'Messages have been sent successfully')

    // }, (errors) => {
    //   // stop loader
    //   this.isMessageSending = false;

    //   // notify
    //   this._notifierService.notify('error', 'An error occured')

    //   // log
    //   console.error(errors);

    // })

  }


  ngOnInit() {
    this.getJobList()
    this.getSelectedCandidates()
  }

}
