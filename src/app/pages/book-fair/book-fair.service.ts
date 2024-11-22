import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookFairService {
  private functionSource = new Subject<void>();
  public bookListFunc$ = this.functionSource.asObservable(); 

  updateBookList(bookList:any) {
    this.functionSource.next(bookList);
  }
}
