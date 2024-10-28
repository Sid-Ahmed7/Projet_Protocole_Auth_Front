import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomButtonComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterVisible: boolean = true;
  filters = {
    isInProgress: false,
    isCompleted: false,
    platform: '',
    genre: '',
    score: '',
    year: ''
  };;

  toggleFilters() {
    this.filterVisible = !this.filterVisible;
  }
  resetFilters() {
    this.filters = {
      isInProgress: false,
      isCompleted: false,
      platform: '',
      genre: '',
      score: '',
      year: ''
    };
  }

}
