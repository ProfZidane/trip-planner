import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, Transport, Activite, ChecklistItem } from '../../models/trip.model';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  trip: Trip;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {
    this.trip = this.tripService.getDefaultTrip();
  }

  ngOnInit() {
    const currentTrip = this.tripService.getCurrentTrip();
    if (currentTrip) {
      this.trip = currentTrip;
    } else {
      this.router.navigate(['/']);
    }
  }

  addTransport() {
    const newTransport: Transport = {
      id: Date.now().toString(),
      personne: '',
      trajet: '',
      cout: 0,
      horaires: '',
      type: 'TER'
    };
    this.trip.transport.push(newTransport);
    this.saveTrip();
  }

  removeTransport(id: string) {
    this.trip.transport = this.trip.transport.filter(t => t.id !== id);
    this.saveTrip();
  }

  addActivite() {
    const newActivite: Activite = {
      id: Date.now().toString(),
      nom: '',
      description: '',
      lien: ''
    };
    this.trip.activites.push(newActivite);
    this.saveTrip();
  }

  removeActivite(id: string) {
    this.trip.activites = this.trip.activites.filter(a => a.id !== id);
    this.saveTrip();
  }

  addChecklistItem() {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: '',
      checked: false
    };
    this.trip.checklist.push(newItem);
    this.saveTrip();
  }

  removeChecklistItem(id: string) {
    this.trip.checklist = this.trip.checklist.filter(c => c.id !== id);
    this.saveTrip();
  }

  saveTrip() {
    this.tripService.saveTrip(this.trip);
  }

  goToView() {
    this.saveTrip();
    this.router.navigate(['/view']);
  }

  trackByTransportId(index: number, transport: Transport): string {
    return transport.id;
  }

  trackByActiviteId(index: number, activite: Activite): string {
    return activite.id;
  }

  trackByChecklistId(index: number, item: ChecklistItem): string {
    return item.id;
  }

  onChecklistChange() {
    this.saveTrip();
    this.tripService.checkValidationStatus();
  }
}