import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EditTripComponent } from './pages/edit-trip/edit-trip.component';
import { ViewTripComponent } from './pages/view-trip/view-trip.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RecoTripDetailModalComponent } from './shared/modals/reco-trip-detail-modal/reco-trip-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditTripComponent,
    ViewTripComponent,
    CreateTripComponent,
    NavbarComponent,
    FooterComponent,
    RecoTripDetailModalComponent
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
