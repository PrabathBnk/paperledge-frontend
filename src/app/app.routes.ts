import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookFairComponent } from './pages/book-fair/book-fair.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "book-fair",
        component: BookFairComponent
    }
];
