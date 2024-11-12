import { NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit,OnChanges{
  @Input() cartItemList:any[] = [];

  public user:any;
  public total:number = 0;
  public paymentMethods:any[] = [];

  constructor(private http:HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get<any[]>("http://localhost:8080/payment-method/all").subscribe(res => {
      this.paymentMethods = res;
    });
    
    this.user = localStorage.getItem('user');
    if (this.user != null) {
      this.user = JSON.parse(this.user);
      this.orderFormGroup.controls['addressLine1'].setValue(this.user.addressLine1);
      this.orderFormGroup.controls['addressLine2'].setValue(this.user.addressLine2);
      this.orderFormGroup.controls['country'].setValue(this.user.country);
      this.orderFormGroup.controls['province'].setValue(this.user.province);
      this.orderFormGroup.controls['postalCode'].setValue(this.user.postalCode);
    }
  }

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

  //Form controlls
  public isCardPayment:boolean = false;
  public orderFormGroup = new FormGroup({
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required)
  });

  public onSubmit():void {
    if (this.user == null || this.cartItemList.length == 0) return;

    //User Address
    this.user.addressLine1 = this.orderFormGroup.value['addressLine1'];
    this.user.addressLine2 = this.orderFormGroup.value['addressLine2'];
    this.user.country = this.orderFormGroup.value['country'];
    this.user.province = this.orderFormGroup.value['province'];
    this.user.postalCode = this.orderFormGroup.value['postalCode'];

    localStorage.setItem("user", JSON.stringify(this.user));
    this.http.put("http://localhost:8080/user/address", this.user).subscribe();

    
    const order = {
      netTotal: this.total,
      paymentMethod: {
        name: this.orderFormGroup.value['paymentMethod']
      },
      status: {
        name: "Placed"
      },
      user: {
        id: this.user?.id
      },
      orderDetails:  this.cartItemList.filter(item => item.quantity != 0)
    }
    
    this.http.post("http://localhost:8080/order", order).subscribe(res => {
      alert("Order placed sucessfully!");
      document.getElementById("orderModalColseBtn")?.dispatchEvent(new Event('click'));
      location.reload();
    }, error => {
      alert("Something went wrong, order placement unsuccessfull!" + error);
    });    
  }

  public paymentMethodOnChange(){
    this.isCardPayment = this.orderFormGroup.value['paymentMethod'] == '' || this.orderFormGroup.value['paymentMethod'] == 'Cash On Delivery';
  }
}
