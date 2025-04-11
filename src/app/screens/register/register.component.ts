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
  isLoading: boolean = false;
  selectedProfile = "jobseeker"
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';

  // functions =========================

  /**
   * Register function
   * @returns 
   */
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

    // check password match
    if (this.password !== this.confirmPassword) {
      this._notifieService.notify('error', 'Passwords do not match');
      return;
    }
    // start loading
    this.isLoading = true;

    // call register api depending on profile
    if (this.selectedProfile === 'jobseeker') {
      console.log("register jobseeker");
      this._appService.registerJobSeeker({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }).subscribe(
        (response) => {
          // stop loading
          this.isLoading = false;
          if (response.status === 'success') {
            this._notifieService.notify('success', 'Registration successful');
            this._router.navigateByUrl('/login');
          } else {
            this._notifieService.notify('error', response.message);
          }
        }
        , (error) => {
          // stop loading
          this.isLoading = false;
          this._notifieService.notify('error', 'Registration failed');

          // log
          console.log(error);

        }
      );
    } else {
      console.log("register employee");

      this._appService.registerEmployer({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }).subscribe(
        (response) => {
          // stop loading
          this.isLoading = false;
          if (response.status === 'success') {
            this._notifieService.notify('success', 'Registration successful');
            this._router.navigateByUrl('/login');
          } else {
            this._notifieService.notify('error', response.message);
          }
        }
        , (error) => {
          // stop loading
          this.isLoading = false;
          this._notifieService.notify('error', 'Registration failed');

          // log
          console.log(error);
        }
      );
    }
    // this._appService.registerEmployer({
    //   username: this.username,
    //   password: this.password,
    //   firstName: this.firstName,
    //   lastName: this.lastName
    // }).subscribe(
    //   (response) => {
    //     // stop loading
    //     this.isLoading = false;
    //     if (response.status === 'success') {
    //       this._notifieService.notify('success', 'Registration successful');
    //       this._router.navigateByUrl('/login');
    //     } else {
    //       this._notifieService.notify('error', response.message);
    //     }
    //   }
    //   , (error) => {
    //     // stop loading
    //     this.isLoading = false;
    //     this._notifieService.notify('error', 'Registration failed');
    //   }
    // );

  }

}
