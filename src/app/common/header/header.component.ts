import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public isLogedIn:boolean = false;
  public profilePicture:String = "";

  public credentials = {
    email: '',
    password: ''
  }
  public logingSuccess:boolean = true;

  constructor(private http: HttpClient, private route:Router) {}

  ngOnInit(): void {
    let user:any = localStorage.getItem("user");

    if(user != null) {
      this.isLogedIn = true;
      this.profilePicture = JSON.parse(user).profilePicture;
    }
  }

  public isActive(pageName:string):boolean {
    return (window.location.href).match(pageName) != null;
  }

  // Should change after creating the ledgers-corner component
  public isHomeActive():boolean{
    return !this.isActive("book-fair") && !this.isActive("user-details") && !this.isActive("sales");
  }

  public logIn(){
    this.credentials.password

    this.http.post("http://localhost:8080/user/auth", this.credentials).subscribe((res)=>{
      this.logingSuccess = res != null;
      let user:any = res;
      if (this.logingSuccess) {       
        this.credentials.email = '';
        this.credentials.password = '';
        this.isLogedIn = true;
        localStorage.setItem("user", JSON.stringify(user));
        this.profilePicture = user.profilePicture;
        this.route.navigate(["/"]);

        document.getElementById("modalColseBtn")?.dispatchEvent(new Event("click"));

        alert("Login successful!")
      }
      
      setTimeout(()=>{
        this.logingSuccess = true;
      }, 10000);
      
    }, (error)=>{
      alert("Something went wrong: "+ error);
    });
  }

  public logout(){
    localStorage.clear();
    this.route.navigate(["/"]);
    location.reload();
  }

  /* Sign up Modal */
  public userDetails = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  public signupForm:FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('',Validators.required),
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl( '',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern("^(?=.+[a-zA-Z])(?=.+\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&]{8,16}$")]),
    confirm: new FormControl('',Validators.required)
  });

  public isValidated:boolean = false; 
  public isPasswordNotMatch:boolean = false;
  public isInValidPassword:boolean = false;
  public isSignupUnsuccess:boolean = false;
  public isInValidUserName:any = false;
  public signupModalAlert = "";

  public signup(){
    //Validations
    this.isValidated = true;
    if(this.signupForm.invalid) return;
    
    this.http.get(`http://localhost:8080/user/validate-username?username=${this.signupForm.controls['username'].value}`).subscribe((res) => {
      this.isInValidUserName = res;
    });

    this.isPasswordNotMatch = this.signupForm.controls['password'].value != this.signupForm.controls['confirm'].value;
    if(this.isPasswordNotMatch) return;
    
    this.http.get(`http://localhost:8080/user/by-email?email=${this.signupForm.value['email']}`).subscribe((res) => {
      this.isSignupUnsuccess = res != null;
      this.signupModalAlert = "This email is already registered.";
      
      setTimeout(() => {
        this.isSignupUnsuccess = false;
      }, 10000);

      if(this.isSignupUnsuccess) return; 
    });
    console.log(true);
    
    this.http.post("http://localhost:8080/user", {
      name: (this.signupForm.value['firstname'] + " " + this.signupForm.value['lastname']),
      username: this.signupForm.value['username'],
      email: this.signupForm.value['email'],
      password: this.signupForm.value['password']
    }).subscribe((res) => {
      alert("Resgistration successfull!")
      this.route.navigate(["/"]);
      this.clearSignUpModalFields();
      document.getElementById("toLoginModal")?.dispatchEvent(new Event("click"));
    }, (error)=>{
      this.isSignupUnsuccess = true;
      this.signupModalAlert = "Signup unsuccessful! Please check your details and try again.";
      
      setTimeout(() => {
        this.isSignupUnsuccess = false;
      }, 10000);
    });
  }

  public clearSignUpModalFields(){
    this.isValidated = false; 
    this.isPasswordNotMatch = false;
    this.isInValidPassword = false;
    this.isSignupUnsuccess = false;
    this.isInValidUserName = false;
    this.signupModalAlert = "";

    this.signupForm.controls['firstname'].setValue("");
    this.signupForm.controls['lastname'].setValue("");
    this.signupForm.controls['username'].setValue("");
    this.signupForm.controls['email'].setValue("");
    this.signupForm.controls['password'].setValue("");
    this.signupForm.controls['confirm'].setValue("");
  }
}
