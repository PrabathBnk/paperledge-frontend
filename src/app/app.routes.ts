import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookFairComponent } from './pages/book-fair/book-fair.component';
import { MainComponent } from './pages/book-fair/main/main.component';
import { BrowseComponent } from './pages/book-fair/browse/browse.component';

export const routes: Routes = [
    {
        path: "",
        title: "Home",
        component: HomeComponent
    },
    {
        path: "book-fair",
        component: BookFairComponent,
        children: [
            {
                path: "",
                title: "Book Fair",
                component: MainComponent
            },
            {
                path: "browse",
                title: "Book Fair: Browse",
                component: BrowseComponent
            }
        ]
    }
];
