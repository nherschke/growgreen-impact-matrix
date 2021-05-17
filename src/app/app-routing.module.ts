import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FutureComponent } from './future/future.component';
import { GreenRoofComponent } from './green-roof/green-roof.component';
import { HomeComponent } from './home/home.component';
import { NbsComponent } from './nbs/nbs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nbs', component: NbsComponent },
  { path: 'green-roof', component: GreenRoofComponent },
  { path: 'future', component: FutureComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
