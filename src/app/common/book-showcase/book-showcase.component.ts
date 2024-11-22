import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.imagePath = "" + this.book.image;
  }

  createTitle():String {
    return this.book.title.length > 45 ? this.book.title.substring(0, 43) + "...": this.book.title;
  }

  addToCart() {
    let user:any = localStorage.getItem("user");
    if(user == null){
      document.getElementById("loginBtn")?.dispatchEvent(new Event("click"));
    } else{
      this.http.post("http://localhost:8080/cart", {
        user: {
          id: JSON.parse(user).id
        },
        book: {
          id: this.book.id
        },
        quantity: 1
      }).subscribe((res)=>{

        if (user != null){
          let cartItems: any = [];
          this.http.get(`http://localhost:8080/cart/all?id=${JSON.parse(user).id}`).subscribe((res)=>{
            cartItems = res;
            const cartNumberElement = document.getElementById("cartNumber");
            if (cartNumberElement) {
                cartNumberElement.innerText = cartItems.length.toString();
            }
          })
         }
      });
    }
  }
}
