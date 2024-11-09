import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{
  public imageFieldText = "Upload image for your book. Make sure it is less than 5MB.";
  public imageFile:any = null;
  public imagePath:String = "";
  public genreList:any;
  public userBookList:any;
  public outOfStock:number = 0;

  public empptyBookModel:any = {
    id : null,
    title: null,
    isbn: null,
    price: null,
    discount: null,
    year: null,
    quantity: null,
    mode: null,
    description: null,
    genre: {
      id: null
    },
    author: {
      name: null
    },
    publication: {
      name: null
    },
    ownerUser: {
      id: "PL240001"
    }
}
  public bookModel:any = this.empptyBookModel;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //Get all genres
    this.http.get("http://localhost:8080/genre/all").subscribe((res) => {
      this.genreList = res;
    });

    //Get all books by the user
    this.loadBooks();
  }

  loadBooks():void {
      this.http.get("http://localhost:8080/book/filter/owner-user?ownerUserId=PL240001").subscribe((res) => {
        this.userBookList = res;
        this.countOutOfStock(this.userBookList);
        
      });
  }

  countOutOfStock(bookList:any[]):void {
    bookList.forEach((book:any) => {
      if(book.quantity == 0) this.outOfStock++
    });
  }

  //Set image to the image view
  setImage(event: Event):void {
    if((event.target as HTMLInputElement).files == null) {
      alert("Something went wrong!");
      return;
    } 
    
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.item(0);

    if ((this.imageFile.size/1024) > 5120) {
      alert("File should be less than 5MB");
      this.imageFile = null;
      return;
    }

    this.imageFieldText = this.imageFile.name;
    this.imagePath = URL.createObjectURL(this.imageFile);

    this.bookForm.controls.image.setValue("True");
  }

  //Clear Fields on close
  public clearFields():void{
    this.imageFile = null;
    this.imagePath = "";
    this.imageFieldText = "Upload image for your book. Make sure it is less than 5MB.";
    this.bookModel = this.empptyBookModel;
    this.bookForm.reset();
  }

  //Form Control
  public bookForm = new FormGroup({
    title: new FormControl(this.bookModel.title, Validators.required),
    isbn: new FormControl(this.bookModel.isbn, Validators.required),
    genre: new FormControl(this.bookModel.genre.id, Validators.required),
    author: new FormControl(this.bookModel.author.name, Validators.required),
    publication: new FormControl(this.bookModel.publication.name, Validators.required),
    year: new FormControl(this.bookModel.year, [
      Validators.required,
      Validators.min(1800),
      Validators.max(new Date().getFullYear())
    ]),
    price: new FormControl(this.bookModel.price, Validators.required),
    discount: new FormControl(this.bookModel.discount),
    mode: new FormControl(this.bookModel.mode, Validators.required),
    quantity: new FormControl(this.bookModel.quantity, [
      Validators.required,
      Validators.min(1)
    ]),
    description: new FormControl(this.bookModel.description),
    image: new FormControl("", Validators.required)
  });
  
  onSubmit():void {
    const formData:FormData = new FormData();
    formData.append("book", JSON.stringify(this.bookModel));
    formData.append("image", this.imageFile);

    this.http.post("http://localhost:8080/book", formData).subscribe((res)=>{
      alert("Book Added Successfully.");
      document.getElementById("closeBtn")?.dispatchEvent(new Event("click"));
      this.clearFields();
      this.loadBooks();
    }, (error) => {
      console.log(error);
      alert("Something went wrong: " + error.name);
    });
  }

  //Book Details Modal
  detailsModalOnInit(book:any):void {
    this.bookModel = book;
    this.imagePath = "http://localhost:8080/" + book.image;
    this.bookForm.controls.image.setValue("True");
  }

  onUpdate():void {
    const formData:FormData = new FormData();
    formData.append("book", JSON.stringify(this.bookModel));
    formData.append("image", this.imageFile);
    
    this.http.put("http://localhost:8080/book", formData).subscribe((res) => {
      alert("Book Details Updated Successfully.");
      document.getElementById("detailModalcloseBtn")?.dispatchEvent(new Event("click"));
      this.loadBooks();
    },(error)=>{
      alert("Something went wrong: " + error.name);
    });
  }

  onDelete():void {
    if(confirm("Are you sure to delete this book?")){
      this.http.delete(`http://localhost:8080/book?id=${this.bookModel.id}`).subscribe((res) => {
        alert("Book Details Deleted Successfully.");
        document.getElementById("detailModalcloseBtn")?.dispatchEvent(new Event("click"));
        this.loadBooks();
      },(error)=>{
        alert("Something went wrong: " + error.name);
      });
    }
  }
}


