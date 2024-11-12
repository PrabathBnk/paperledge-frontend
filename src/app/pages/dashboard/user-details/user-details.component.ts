import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  public user:any;
  public inprogessOrders:any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);

    this.loadInProgressOrders();
  }

  loadInProgressOrders() {
    this.http.get<any[]>(`http://localhost:8080/order/all/by-user-id?id=${this.user.id}`).subscribe(res => {
      this.inprogessOrders = res;

      this.inprogessOrders = this.inprogessOrders.filter(order =>  order.status.name != 'Returned' && order.status.name != 'Cancelled');
    });
  }
}
