import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EditTripComponent } from './pages/edit-trip/edit-trip.component';
import { ViewTripComponent } from './pages/view-trip/view-trip.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditTripComponent,
    ViewTripComponent,
    CreateTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
