import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Router } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { SelectedCandidateCardComponent } from "../../../components/selected-candidate-card/selected-candidate-card.component";
// var text = require('textbelt')

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
    private _notifierService: NotifierService,
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
  selectedJob: any = null
  job_title = ''

  // --- finalist info
  all_finalist: any[] = [];
  real_finalist: any[] = [];
  abstract_finalist: any[] = [];
  selected_finalist: any[] = [];
  rest_finalist: any[] = [];
  nb_available_places = 2;



  // function =============================================

  backToCandidateList() {
    this.isSelectedCandidateDisplayed = false
  }

  /**
   * Get job list from server
   */
  getJobList() {
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
    // start loading ...
    this.isSelectionLoading = true
    this._appService.analyzeCandidatures(Number.parseInt(this.selectedJob)).subscribe((res) => {

      // get all finalist
      this.all_finalist = res.finalists_with_info
      this.real_finalist = this.all_finalist.filter((item, index) => { return item.user.username != "" })
      this.abstract_finalist = this.all_finalist.filter((item, index) => { return item.user.username == "" })
      this.selected_finalist = this.real_finalist.slice(0, this.nb_available_places)
      this.rest_finalist = this.real_finalist.slice(this.nb_available_places)

      console.log("real finalist");
      console.log(this.real_finalist);

      console.log("abstract finalist");
      console.log(this.abstract_finalist);


      // code ...
      this.isSelectionLoading = false;

    }, (error) => {

      // display selected candidates
      this.isSelectedCandidateDisplayed = false

      // stop loading
      this.isSelectionLoading = false

      // log
      console.error(error);

      // notify
      this._notifierService.notify('error', 'An error occured')

    })

  }

  /**
   * Navigate to show result page
   */
  gotoresultPage() {
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

    try {
      this.isMessageSending = true;
      this._appService.sendMessage(message)

      this._notifierService.notify('success', 'Messages have been sent successfully')
    } catch (error) {
      this._notifierService.notify('error', 'An error occured')
    } finally {
      this.isMessageSending = false;
    }

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
