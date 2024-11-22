import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgFor, RouterLink],
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

      this.inprogessOrders = this.inprogessOrders.filter(order =>  order.status.name != 'Returned' && order.status.name != 'Cancelled' && order.status.name != 'Delivered');
    });
  }

  updateProfilePictue(event:Event){
    if((event.target as HTMLInputElement).files == null) {
      alert("Something went wrong!");
      return;
    } 
    
    const input = event.target as HTMLInputElement;
    let imageFile = input.files?.item(0);

    if (imageFile != null && (imageFile.size/1024) > 5120) {
      alert("File should be less than 5MB");
      return;
    }

    if(imageFile != null){
      const formData = new FormData();
      formData.append("id", "PL20240003");
      formData.append("image", imageFile);
      
      this.http.put<any>("http://localhost:8080/user/profile-picture", formData).subscribe({
        next: (res) => {
          this.user.profilePicture = res.image;
          localStorage.setItem('user', JSON.stringify(this.user));
        }, 
        error: (error) => {
          alert("Something went wrong");
        }
      });
    }
  }
}
