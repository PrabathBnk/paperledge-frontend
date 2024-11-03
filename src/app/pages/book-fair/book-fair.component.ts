import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BookShowcaseComponent } from '../../common/book-showcase/book-showcase.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-fair',
  standalone: true,
  imports: [NgFor, BookShowcaseComponent, RouterOutlet],
  templateUrl: './book-fair.component.html',
  styleUrl: './book-fair.component.css'
})
export class BookFairComponent {

}
