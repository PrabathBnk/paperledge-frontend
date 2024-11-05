import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { UserDetailsComponent } from "./user-details/user-details.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, UserDetailsComponent, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public isActive(pageName:string):boolean {
    return (window.location.href).match(pageName) != null;
  }
}
