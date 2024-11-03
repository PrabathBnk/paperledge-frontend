import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BookShowcaseComponent } from '../../common/book-showcase/book-showcase.component';

@Component({
  selector: 'app-book-fair',
  standalone: true,
  imports: [NgFor, BookShowcaseComponent],
  templateUrl: './book-fair.component.html',
  styleUrl: './book-fair.component.css'
})
export class BookFairComponent {
  public categoryLit:string[] = ["Sinhala", "English", "Fiction", "Historical", "Educationl", "Novel", "Short Story", "Mystery", "Fantacy","Thriller"];

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
