import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartDetailsComponent } from "./cart-details/cart-details.component";

@Component({
  selector: 'app-book-fair',
  standalone: true,
  imports: [RouterOutlet, NgClass, CartDetailsComponent],
  templateUrl: './book-fair.component.html',
  styleUrl: './book-fair.component.css'
})
export class BookFairComponent implements OnInit{

  public cartItems:any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let user:any = localStorage.getItem("user");
     if (user != null){
      this.http.get(`http://localhost:8080/cart/all?id=${JSON.parse(user).id}`).subscribe((res)=>{
        this.cartItems = res;
        
      })
     }
  }
}
