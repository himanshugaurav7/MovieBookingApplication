import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeleteMovieComponent } from './pages/delete-movie/delete-movie.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchMovieComponent } from './pages/search-movie/search-movie.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'api/v1.0/moviebooking/login',
    pathMatch:'full'
  },{path:'api/v1.0/moviebooking/login',
    component: LoginComponent,
    pathMatch:'full'
  },{
    path:'api/v1.0/moviebooking/register',
    component:RegisterComponent,
    pathMatch:'full'
  },
  {
    path:'api/v1.0/moviebooking/forgot',
    component:ForgotComponent,
    pathMatch:'full'
  },
  {
    path:'api/v1.0/moviebooking/all',
    component:MoviesComponent,
    pathMatch:'full'
  },
  {
    path:'api/v1.0/moviebooking/search',
    component:SearchMovieComponent,
    pathMatch:'full'
  },
  {
    path:'api/v1.0/moviebooking/add',
    component:BookingComponent,
    pathMatch:'full',
    canActivate:[UserGuard]
  },
  {
    path:'api/v1.0/moviebooking/delete',
    component:DeleteMovieComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'api/v1.0/moviebooking/home',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'api/v1.0/moviebooking/update',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
