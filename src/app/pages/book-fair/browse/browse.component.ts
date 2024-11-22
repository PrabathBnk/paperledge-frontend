import { NgClass, NgFor } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BookShowcaseComponent } from '../../../common/book-showcase/book-showcase.component';
import { HttpClient } from '@angular/common/http';
import { BookFairService } from '../book-fair.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [NgFor, NgClass, BookShowcaseComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit{
  public bookList:any;
  public selectedRating:string = "";

  constructor(private http: HttpClient, private service: BookFairService) {}

  ngOnInit(): void {
    this.service.bookListFunc$.subscribe(bookList => this.bookList = bookList);
  }

  changeSelectedRating(rating:string):void{
    this.selectedRating = rating;
  }
}
