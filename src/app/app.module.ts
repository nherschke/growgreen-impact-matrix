import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NbsComponent } from './nbs/nbs.component';
import { GreenRoofComponent } from './green-roof/green-roof.component';
import { AboutComponent } from './about/about.component';
import { FutureComponent } from './future/future.component';
import { VerticalGardenComponent } from './vertical-garden/vertical-garden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NbsComponent,
    GreenRoofComponent,
    AboutComponent,
    FutureComponent,
    VerticalGardenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
