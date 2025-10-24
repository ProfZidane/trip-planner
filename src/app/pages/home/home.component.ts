import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tripForm: FormGroup;
  selectedDestination: Destination | null = null;
  isModalVisible = false;
  
  destinations: Destination[] = [
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      image: 'assets/imgs/paris.avif',
      description: 'La Ville Lumière vous attend avec ses monuments emblématiques, sa gastronomie raffinée et son art de vivre unique.',
      whyVisit: [
        'Découvrir la Tour Eiffel et les Champs-Élysées',
        'Visiter le Louvre et ses chefs-d\'œuvre',
        'Flâner dans Montmartre et le Marais',
        'Savourer la gastronomie française'
      ],
      bestPeriod: 'Avril à Octobre',
      recommendedDuration: '4-5 jours'
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japon',
      image: 'assets/imgs/tokyo.jpg',
      description: 'Une métropole fascinante où tradition et modernité se côtoient dans une harmonie parfaite.',
      whyVisit: [
        'Explorer les quartiers de Shibuya et Harajuku',
        'Visiter les temples traditionnels',
        'Découvrir la cuisine japonaise authentique',
        'Admirer les cerisiers en fleurs'
      ],
      bestPeriod: 'Mars à Mai, Septembre à Novembre',
      recommendedDuration: '7-10 jours'
    },
    {
      id: 'london',
      name: 'London',
      country: 'Royaume-Uni',
      image: 'assets/imgs/london.jpg',
      description: 'Une capitale historique riche en culture, musées et parcs magnifiques.',
      whyVisit: [
        'Visiter Big Ben et le Palais de Buckingham',
        'Explorer les musées de classe mondiale',
        'Se promener dans Hyde Park',
        'Découvrir les marchés de Camden'
      ],
      bestPeriod: 'Mai à Septembre',
      recommendedDuration: '4-6 jours'
    },
    {
      id: 'newyork',
      name: 'New York',
      country: 'États-Unis',
      image: 'assets/imgs/New_york.jpg',
      description: 'La ville qui ne dort jamais, symbole du rêve américain et de la diversité culturelle.',
      whyVisit: [
        'Admirer la Statue de la Liberté',
        'Se promener dans Central Park',
        'Découvrir Broadway et Times Square',
        'Visiter les musées de renommée mondiale'
      ],
      bestPeriod: 'Avril à Juin, Septembre à Novembre',
      recommendedDuration: '5-7 jours'
    },
    {
      id: 'barcelona',
      name: 'Barcelona',
      country: 'Espagne',
      image: 'assets/imgs/barcelone.jpg',
      description: 'Une ville méditerranéenne vibrante, célèbre pour son architecture unique et sa vie nocturne.',
      whyVisit: [
        'Admirer la Sagrada Familia de Gaudí',
        'Flâner sur les Ramblas',
        'Profiter des plages urbaines',
        'Découvrir la cuisine catalane'
      ],
      bestPeriod: 'Mai à Octobre',
      recommendedDuration: '3-5 jours'
    },
    {
      id: 'abidjan',
      name: 'Abidjan',
      country: 'Côte d\'Ivoire',
      image: 'assets/imgs/abidjan.avif',
      description: 'La perle des lagunes, capitale économique dynamique de l\'Afrique de l\'Ouest.',
      whyVisit: [
        'Explorer le quartier moderne du Plateau',
        'Découvrir les marchés colorés de Treichville',
        'Profiter des plages de Grand-Bassam',
        'Savourer la cuisine ivoirienne'
      ],
      bestPeriod: 'Novembre à Mars',
      recommendedDuration: '4-6 jours'
    }
  ];

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

  openDestinationModal(destinationName: string) {
    this.selectedDestination = this.destinations.find(d => d.name === destinationName) || null;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedDestination = null;
  }
}