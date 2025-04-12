import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    protected _appService: AppService,
    private _router: Router
  ) { }

  // function =============================

  /**
   * Log out
   */
  logout() {
    this._appService.logout();
    this._router.navigateByUrl('/')

    console.log('logged out');

  }

}
