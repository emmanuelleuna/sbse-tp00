import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    NotifierModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private _notifieService: NotifierService,
    private _router: Router,
    private _appService: AppService
  ) {

  }

  // variables =========================
  selectedProfile = "jobseeker"
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';

  // functions =========================

  register() {
    // check empty field
    if (
      !this.firstName ||
      !this.lastName ||
      !this.password ||
      !this.confirmPassword ||
      !this.username
    ) {
      this._notifieService.notify('error', 'Please fill all fields');
      return;
    }

  }

}
