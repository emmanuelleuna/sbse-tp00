import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../services/app.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

/**
 * username: employer125
 * password: securePassword!
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    NotifierModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    NotifierService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _notifierService: NotifierService,
    protected _appService: AppService,
    private _router: Router
  ) {
  }

  // variables =========================
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  /**
   * Login function
   * @returns void
   */
  handleLogin() {
    // check empty fields
    if (this.email == '' || this.password == '') {
      this._notifierService.notify('error', 'Please fill all fields');
      return;
    }

    // start loading
    this.isLoading = true

    // call login api
    this._appService.login({ username: this.email, password: this.password }).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this._notifierService.notify('error', 'Incorrect username or password')
      }
      return throwError(() => error);
    })).subscribe(
      (response) => {

        console.log((response));

        // // stop loading
        // this.isLoading = false;
        if (response.access_token) {
          this._notifierService.notify('success', 'Login successful');

          // set user data
          // this.appService.setUserData(response.user); code ...
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.access_token);

          console.log('user id: ', response.user_id);
          this._router.navigateByUrl('/site/job-list')

          // get user data
          this._appService.getUserDataFromServer(response.user_id).subscribe((res) => {

            // stop loader
            this.isLoading = false;

            // set user data
            this._appService.setUserData(res)

            // navigate to find job page
            this._router.navigateByUrl('/site/job-list')
          }, (error) => {
            // notify
            this._notifierService.notify('error', 'An error occured')

            // log
            console.error(error);

          })
        } else {
          this._notifierService.notify('error', response.message);
        }
      },
      (error) => {
        // stop loading
        this.isLoading = false;
        this._notifierService.notify('error', 'Login failed');

        console.log(error);

      }
    );

  }

}
