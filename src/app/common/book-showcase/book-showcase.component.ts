import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-showcase',
  standalone: true,
  imports: [],
  templateUrl: './book-showcase.component.html',
  styleUrl: './book-showcase.component.css'
})
export class BookShowcaseComponent {
  @Input() book:any;
  
}
