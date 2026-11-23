import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Conference } from '../Models/conference';

@Component({
  selector: 'app-conference-details',
  imports: [DatePipe, NgClass],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails {
  // Parent -> enfant : la conférence sélectionnée
  @Input() conference: Conference | null = null;

  // Enfant -> parent : demande de fermeture du détail
  @Output() closed = new EventEmitter<void>();

  // Enfant -> parent : demande d'inscription à la conférence affichée
  @Output() registered = new EventEmitter<Conference>();

  close() {
    this.closed.emit();
  }

  register() {
    if (this.conference && this.remainingPlaces > 0) {
      this.registered.emit(this.conference);
    }
  }

  get remainingPlaces(): number {
    return this.conference
      ? this.conference.maxParticipants - this.conference.nbParticipants
      : 0;
  }
}