import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [NgFor],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent implements OnInit{
  public ordersList:any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user);

    this.http.get<any[]>(`http://localhost:8080/order/all/by-user-id?id=${user.id}`).subscribe(res => {
      this.ordersList = res;
      
    });
  }
}
