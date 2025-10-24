import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      destination: ['', Validators.required],
      participants: [''],
      objective: ['loisir']
    });
  }

  ngOnInit() {
    this.tripService.checkAndUpdateExpiredTrips();
  }
  
  hasExistingTrip(): boolean {
    return this.tripService.getTrips().length > 0;
  }

  getCurrentTrip() {
    return this.tripService.getCurrentTrip();
  }

  getRecentTrips() {
    return this.tripService.getTrips().slice(0, 3);
  }

  

  getStatusLabel(status: string): string {
    switch(status) {
      case 'planned': return 'Planifié';
      case 'validated': return 'Validé';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return 'Planifié';
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'planned': return 'bg-primary';
      case 'validated': return 'bg-warning';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-secondary';
      default: return 'bg-primary';
    }
  }

  editTrip() {
    this.router.navigate(['/edit']);
  }

  loadExample() {
    this.tripService.loadExampleTrip();
    this.router.navigate(['/edit']);
  }
}