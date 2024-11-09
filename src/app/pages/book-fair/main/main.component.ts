import { Component, OnInit } from '@angular/core';
import { BookShowcaseComponent } from '../../../common/book-showcase/book-showcase.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BookShowcaseComponent, NgFor, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public categoryList:any =[
    {
      name: "Sinhala",
      color: "0DA053",
    },
    {
      name: "English",
      color: "8F11AE",
    },
    {
      name: "Fiction",
      color: "0D59A0",
    },
    {
      name: "Educationl",
      color: "A00D5E",
    },
    {
      name: "Business",
      color: "8338ec",
    },
    {
      name: "Historical",
      color: "B0780E",
    },
    {
      name: "Novel",
      color: "2a9d8f",
    },
    {
      name: "Short Story",
      color: "f07167",
    },
    {
      name: "Mystery",
      color: "003566",
    },
    {
      name: "Fantacy",
      color: "06d6a0",
    },
    {
      name: "Thriller",
      color: "9a031e",
    }
  ]
  public allBookList:any;
  public bookList:any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get("http://localhost:8080/book/all").subscribe((res) => {
      this.allBookList = res;
      this.bookList = this.allBookList.slice(0, 6);
    });
  }



  public sampleBook:any = {
    name: "Papers Have What You Want",
    rating: 4.9,
    genre: "Education",
    year: 2024,
    price: 2500.0,
    oldPrice: 3000.0,
    imgPath: "assets/images/sample-book-cover.png"
  }

  public iterate:number[] = [1,2,3,4,5,6];



}
