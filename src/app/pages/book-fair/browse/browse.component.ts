import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BookShowcaseComponent } from '../../../common/book-showcase/book-showcase.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [NgFor, NgClass, BookShowcaseComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {
  public sampleBook:any = {
    name: "Papers Have What You Want",
    rating: 4.9,
    genre: "Education",
    year: 2024,
    price: 2500.0,
    oldPrice: 3000.0,
    imgPath: "assets/images/sample-book-cover.png"
  }

  public iterate:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public selectedRating:string = "";

  changeSelectedRating(rating:string):void{
    this.selectedRating = rating;
  }
}
