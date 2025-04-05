import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { AppService } from '../../services/app.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    this._appService.login({ username: this.email, password: this.password }).subscribe(
      (response) => {
        // stop loading
        this.isLoading = false;
        if (response.status === 'success') {
          this._notifierService.notify('success', 'Login successful');

          // set user data
          // this.appService.setUserData(response.user); code ...
          localStorage.setItem('access_token', response.token);
          this._router.navigateByUrl("/")
        } else {
          this._notifierService.notify('error', response.message);
        }
      },
      (error) => {
        // stop loading
        this.isLoading = false;
        this._notifierService.notify('error', 'Login failed');
      }
    );

  }

}
