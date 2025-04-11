import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

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
    private _router: Router,
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
      this.job_id = params['id']
    })
  }

  /**
   * Back to candidate list
   */
  backToCandidateList() {
    this._location.back()
  }

  sendMessageToCandidate() {
    this.selectedCandidates.map((c, index) => {
      let data = {
        id_sender: 0,
        id_receiver: 1,
        message: "",
        created_at: new Date()
      }

      this._appService.sendMessage(data).subscribe((response) => {

      }, (error) => {
        // notify
        this._notifierService.notify('error', "An error occurred")

        // log
        console.error(error);
        

      })
    })

  }


  ngOnInit() {
    this.getSelectedCandidate()
  }
}
