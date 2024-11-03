import { Component } from '@angular/core';
import { BookShowcaseComponent } from "../../common/book-showcase/book-showcase.component";
import { NgFor } from '@angular/common';
import { PostComponent } from "../../common/post/post.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookShowcaseComponent, NgFor, PostComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
}
