import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartDetailsComponent } from "./cart-details/cart-details.component";
import { FormsModule } from '@angular/forms';
import { BookFairService } from './book-fair.service';

@Component({
  selector: 'app-book-fair',
  standalone: true,
  imports: [RouterOutlet, NgClass, CartDetailsComponent, FormsModule],
  templateUrl: './book-fair.component.html',
  styleUrl: './book-fair.component.css'
})
export class BookFairComponent implements OnInit{
  public searchBy:string = "title";
  public searchText:string = "";
  public cartItems:any = [];
  public user:any;

  constructor(private http: HttpClient, private router: Router, private service: BookFairService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (this.user != null) this.updateCartList();
  }

  onSearch(){
    if(this.searchBy == "title"){
      this.http.get<any[]>(`http://localhost:8080/book/filter/title?title=${this.searchText}`).subscribe(res => {
        this.service.updateBookList(res);
      });
    } else if(this.searchBy == "author"){
      this.http.get<any[]>(`http://localhost:8080/book/filter/author?author=${this.searchText}`).subscribe(res => {
        this.service.updateBookList(res);
      });
    } else if(this.searchBy == "isbn"){
      this.http.get(`http://localhost:8080/book/filter/isbn?isbn=${this.searchText}`).subscribe(res => {
        this.service.updateBookList(res);
      });
    }

    this.router.navigate(['/book-fair/browse']);
  }

  updateCartList(){
    this.http.get(`http://localhost:8080/cart/all?id=${this.user.id}`).subscribe((res)=>{
      this.cartItems = res;
    })
  }
}
