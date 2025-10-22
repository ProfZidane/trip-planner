import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { EditTripComponent } from './pages/edit-trip/edit-trip.component';
import { ViewTripComponent } from './pages/view-trip/view-trip.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateTripComponent },
  { path: 'edit', component: EditTripComponent },
  { path: 'view', component: ViewTripComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
