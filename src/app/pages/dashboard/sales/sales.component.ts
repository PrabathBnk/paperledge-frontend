import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  public currentYear = new Date().getFullYear();
  public image:any;

  setImage(event: Event):void {
    if((event.target as HTMLInputElement).files == null) {
      alert("Something went wrong!");
      return;
    } 
    
    const input = event.target as HTMLInputElement;
    this.image = input.files?.item(0);
    
    
  }
}
