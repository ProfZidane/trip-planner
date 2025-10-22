import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripSubject = new BehaviorSubject<Trip | null>(null);
  public trip$ = this.tripSubject.asObservable();

  constructor() {
    this.loadTrip();
  }

  saveTrip(trip: Trip): void {
    localStorage.setItem('tripData', JSON.stringify(trip));
    this.tripSubject.next(trip);
  }

  loadTrip(): Trip | null {
    const data = localStorage.getItem('tripData');
    if (data) {
      const trip = JSON.parse(data);
      this.tripSubject.next(trip);
      return trip;
    }
    return null;
  }

  getCurrentTrip(): Trip | null {
    return this.tripSubject.value;
  }

  clearTrip(): void {
    localStorage.removeItem('tripData');
    this.tripSubject.next(null);
  }

  getDefaultTrip(): Trip {
    return {
      dates: { from: '', to: '' },
      destination: '',
      participants: [],
      objective: '',
      transport: [],
      hebergement: {
        nom: '',
        adresse: '',
        type: '',
        prixTotal: 0,
        note: ''
      },
      activites: [],
      checklist: [],
      status: 'planned'
    };
  }

  loadExampleTrip(): void {
    const exampleTrip: Trip = {
      dates: { from: '2025-10-24', to: '2025-10-26' },
      destination: 'Chartres',
      participants: ['Madame', 'Vous'],
      objective: 'loisir',
      transport: [
        { id: '1', personne: 'Madame', trajet: 'Paris → Chartres', cout: 15.20, horaires: '09:15 → 10:12', type: 'TER' },
        { id: '2', personne: 'Vous', trajet: 'Paris → Chartres', cout: 15.20, horaires: '09:15 → 10:12', type: 'TER' }
      ],
      hebergement: {
        nom: 'Hôtel des Voyageurs',
        adresse: '12 rue de la Gare, Chartres',
        type: 'Hôtel 3 étoiles',
        prixTotal: 120,
        note: 'Petit-déjeuner inclus, parking gratuit'
      },
      activites: [
        { id: '1', nom: 'Cathédrale Notre-Dame', description: 'Visite de la célèbre cathédrale gothique', lien: 'https://www.cathedrale-chartres.org' },
        { id: '2', nom: 'Musée des Beaux-Arts', description: 'Collection d\'art français du 18e siècle', lien: '' }
      ],
      checklist: [
        { id: '1', text: 'Réserver les billets de train', checked: true },
        { id: '2', text: 'Confirmer la réservation d\'hôtel', checked: false },
        { id: '3', text: 'Vérifier les horaires d\'ouverture des musées', checked: false }
      ],
      status: 'planned'
    };
    this.saveTrip(exampleTrip);
  }

  updateTripStatus(status: 'planned' | 'validated' | 'completed' | 'cancelled'): void {
    const trip = this.getCurrentTrip();
    if (trip) {
      trip.status = status;
      this.saveTrip(trip);
    }
  }

  checkValidationStatus(): void {
    const trip = this.getCurrentTrip();
    if (trip && trip.status === 'planned') {
      const allChecked = trip.checklist.every(item => item.checked);
      if (allChecked && trip.checklist.length > 0) {
        trip.status = 'validated';
        this.saveTrip(trip);
      }
    }
  }

  checkAndUpdateExpiredTrips(): void {
    const trip = this.getCurrentTrip();
    if (trip && trip.status === 'planned') {
      const today = new Date();
      const endDate = new Date(trip.dates.to);
      if (endDate < today) {
        trip.status = 'cancelled';
        this.saveTrip(trip);
      }
    }
  }
}