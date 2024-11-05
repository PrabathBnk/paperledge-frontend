import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
}