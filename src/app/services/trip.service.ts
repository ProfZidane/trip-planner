import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  public trips$ = this.tripsSubject.asObservable();

  constructor() {
    this.loadTrips();
    this.loadExampleTrip();
  }

  saveTrip(trip: Trip): void {
    const trips = this.getTrips();
    const existingIndex = trips.findIndex(t => t.destination === trip.destination);
    
    if (existingIndex >= 0) {
      trips[existingIndex] = trip;
    } else {
      trip.id = Date.now().toString();
      trips.push(trip);
    }
    
    localStorage.setItem('tripsData', JSON.stringify(trips));
    this.tripsSubject.next(trips);
  }

  loadTrips(): Trip[] {
    const data = localStorage.getItem('tripsData');
    if (data) {
      const trips = JSON.parse(data);
      this.tripsSubject.next(trips);
      return trips;
    }
    return [];
  }

  getTrips(): Trip[] {
    return this.tripsSubject.value;
  }

  getCurrentTrip(): Trip | null {
    const trips = this.getTrips();
    return trips.length > 0 ? trips[trips.length - 1] : null;
  }

  clearTrips(): void {
    localStorage.removeItem('tripsData');
    this.tripsSubject.next([]);
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
      status: 'planned',
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147'
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
    const trips = this.getTrips();
    const today = new Date();
    
    trips.forEach(trip => {
      if (trip.status === 'planned') {
        const endDate = new Date(trip.dates.to);
        if (endDate < today) {
          trip.status = 'cancelled';
        }
      }
    });
    
    localStorage.setItem('tripsData', JSON.stringify(trips));
    this.tripsSubject.next(trips);
  }
}