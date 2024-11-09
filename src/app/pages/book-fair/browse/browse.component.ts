import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookShowcaseComponent } from '../../../common/book-showcase/book-showcase.component';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8080/book/all").subscribe((res) => {
      this.bookList = res;
    });
  }

  changeSelectedRating(rating:string):void{
    this.selectedRating = rating;
  }
}
