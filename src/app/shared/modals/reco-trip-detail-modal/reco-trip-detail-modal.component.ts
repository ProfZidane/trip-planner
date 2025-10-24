import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Destination } from '../../../models/destination.model';

@Component({
  selector: 'app-reco-trip-detail-modal',
  templateUrl: './reco-trip-detail-modal.component.html',
  styleUrls: ['./reco-trip-detail-modal.component.css']
})
export class RecoTripDetailModalComponent {
  @Input() destination!: Destination;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit();
  }

  planTrip() {
    this.router.navigate(['/create'], { 
      queryParams: { destination: this.destination.name } 
    });
    this.closeModal();
  }
}