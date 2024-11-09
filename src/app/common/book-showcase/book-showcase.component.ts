import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-showcase',
  standalone: true,
  imports: [NgIf],
  templateUrl: './book-showcase.component.html',
  styleUrl: './book-showcase.component.css'
})
export class BookShowcaseComponent implements OnInit{
  @Input() book:any;
  
  public imagePath:String = "";
  public bookTitle:String = "";

  ngOnInit(): void {
    this.imagePath = "" + this.book.image;
  }

  createTitle():String {
    return this.book.title.length > 45 ? this.book.title.substring(0, 43) + "...": this.book.title;
  }
}
