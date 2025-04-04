import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarRoute } from '../../../models/sidebar-menu-item';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    NgFor
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  /**
   * Sidebar routes for the admin dashboard
   * @type {SidebarRoute[]}
   * @description This array contains the routes for the sidebar menu in the admin dashboard.
   * Each object in the array represents a route with a title, icon, and URL.
   * @property {string} title - The title of the route.
   * @property {string} icon - The icon class for the route.
   * @property {string} url - The URL path for the route.
   */
  sidebar_routes: SidebarRoute[] = [
    // dashboard
    {
      title: 'Dashboard',
      icon: 'bi bi-cast',
      url: 'admin/dashboard'
    },

    // Manage Jobs
    {
      title: 'Manage Jobs',
      icon: 'bi bi-gem',
      url: 'admin/manage-jobs'
    },

    // Manage Candidates
    {
      title: 'Manage Candidates',
      icon: 'bi bi-person-plus',
      url: 'admin/manage-candidates'
    },

    // Manage Candidates
    {
      title: 'Post New Job',
      icon: 'bi bi-file-text',
      url: 'admin/create-job'
    },

    // Profile
    {
      title: 'Profile',
      icon: 'bi bi-person',
      url: 'admin/profile'
    },
  ]

  toggleDrawer(){
    
  }

}
