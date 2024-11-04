import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isLogedIn:boolean = true;

  public isActive(pageName:string):boolean {
    return (window.location.href).match(pageName) != null;
  }

  // Should change after creating the ledgers-corner component
  public isHomeActive():boolean{
    return !this.isActive("book-fair");
  }
}
