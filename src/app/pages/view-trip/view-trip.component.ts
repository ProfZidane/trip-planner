import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-trip',
  templateUrl: './view-trip.component.html',
  styleUrls: ['./view-trip.component.css']
})
export class ViewTripComponent implements OnInit {
  trip: Trip | null = null;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trip = this.tripService.getCurrentTrip();
    if (!this.trip) {
      this.router.navigate(['/']);
    }
  }

  getTotalTransportCost(): number {
    return this.trip?.transport.reduce((total, t) => total + t.cout, 0) || 0;
  }

  exportToPDF() {
    const element = document.getElementById('trip-content');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`plan-voyage-${this.trip?.destination}.pdf`);
      });
    }
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

  goToEdit() {
    this.router.navigate(['/edit']);
  }

  updateStatus(status: 'planned' | 'validated' | 'completed' | 'cancelled') {
    this.tripService.updateTripStatus(status);
    this.trip = this.tripService.getCurrentTrip();
  }
}