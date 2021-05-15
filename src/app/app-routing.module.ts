import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreenRoofComponent } from './green-roof/green-roof.component';
import { HomeComponent } from './home/home.component';
import { NbsComponent } from './nbs/nbs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nbs', component: NbsComponent },
  { path: 'green-roof', component: GreenRoofComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
