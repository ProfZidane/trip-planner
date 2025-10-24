import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {
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
      participants: ['', Validators.required],
      objective: ['loisir', Validators.required]
    });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      const formValue = this.tripForm.value;
      const trip = this.tripService.getDefaultTrip();
      
      trip.dates = {
        from: formValue.dateFrom,
        to: formValue.dateTo
      };
      trip.destination = formValue.destination;
      trip.participants = formValue.participants.split(',').map((p: string) => p.trim()).filter((p: string) => p);
      trip.objective = formValue.objective;

      this.tripService.saveTrip(trip);
      this.router.navigate(['/edit']);
    }
  }
}