import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-twenty-four-hours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-twenty-four-hours.component.html',
  styleUrl: './modal-twenty-four-hours.component.css'
})
export class ModalTwentyFourHoursComponent {
  showModal: boolean = false;

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  toggleModal() {
    this.showModal = !this.showModal;
  }
  hideModal() {
    this.showModal = false;
    this.closeModal.emit();
  }
}
