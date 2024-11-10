import { NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnChanges{
  @Input() cartItemList:any[] = [];

  public total:number = 0;
  

  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotal();
  }

  public calcTotal():void {  
    this.total = 0;
    for(let item of this.cartItemList){
      if (item.quantity < 0) item.quantity = 0;

      this.total += item.quantity * (item.book.price - item.book.discount);
    }
  }
}
