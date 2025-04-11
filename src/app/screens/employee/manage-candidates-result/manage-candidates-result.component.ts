import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-manage-candidates-result',
  standalone: true,
  imports: [
    CommonModule,
    NotifierModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './manage-candidates-result.component.html',
  styleUrl: './manage-candidates-result.component.css'
})
export class ManageCandidatesResultComponent {
  constructor(
    private _appService: AppService,
    private _notifierService: NotifierService,
    private _activeRoute: ActivatedRoute,
    private _location: Location,
  ) {

  }

  // variables ============================================
  selectedCandidates: any[] = []
  isMessageSending = false;
  job_id = null

  // function =============================================

  /**
   * Selecte job result from server
   */
  getSelectedCandidate() {
    this._activeRoute.queryParams.subscribe((params) => {

      // get job id from url
      this.job_id = params['job_id']

      // log
      console.log("job id", this.job_id);

      // get selected candidate
      // populate selectedcandidate list
      this.selectedCandidates.push(
        {
          url: "http:...",
          name: "Jhon Cater",
          gender: "Male",
          email: "jhoncarter@gmail.com",
          phone: "650 503 478"
        },
      )

    })
  }

  /**
   * Back to candidate list
   */
  backToCandidateList() {
    this._location.back()
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
    this.getSelectedCandidate()
  }
}
