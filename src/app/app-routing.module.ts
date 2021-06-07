import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { GreenRoofComponent } from './green-roof/green-roof.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { NbsComponent } from './nbs/nbs.component';
import { OutputComponent } from './output/output.component';
import { VerticalGardenComponent } from './vertical-garden/vertical-garden.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nbs', component: NbsComponent },
  { path: 'vertical-garden', component: VerticalGardenComponent },
  { path: 'green-roof', component: GreenRoofComponent },
  { path: 'data', component: DataComponent },
  { path: 'about', component: AboutComponent },
  { path: 'input', component: InputComponent },
  { path: 'output', component: OutputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
