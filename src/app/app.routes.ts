import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookFairComponent } from './pages/book-fair/book-fair.component';
import { MainComponent } from './pages/book-fair/main/main.component';
import { BrowseComponent } from './pages/book-fair/browse/browse.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
import { PurchasesComponent } from './pages/dashboard/purchases/purchases.component';

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
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: "user-details",
                title: "User Details",
                component: UserDetailsComponent
            },
            {
                path: "purchases",
                title: "Purchases",
                component: PurchasesComponent
            }
        ]
    }
];
