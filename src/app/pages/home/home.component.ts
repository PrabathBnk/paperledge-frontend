import { Component, OnInit } from '@angular/core';
import { BookShowcaseComponent } from "../../common/book-showcase/book-showcase.component";
import { NgFor } from '@angular/common';
import { PostComponent } from "../../common/post/post.component";
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookShowcaseComponent, NgFor, PostComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public bookList:any[] = [];

  public allBooks:any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8080/book/all").subscribe((res) => {
      this.allBooks = res;
       this.bookList = this.allBooks.slice(0, 6);  
    });
  }
}
