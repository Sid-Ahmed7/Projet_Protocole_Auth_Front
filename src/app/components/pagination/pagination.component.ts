import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [NgFor, NgIf] 
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];
  showEllipsis: boolean = false;
  pageWindow: number = 5;

  ngOnChanges() {
    this.calculatePages();
  }

  calculatePages() {
    this.pages = [];
    this.showEllipsis = false;

    let startPage = Math.max(this.currentPage - Math.floor(this.pageWindow / 2), 1);
    let endPage = Math.min(startPage + this.pageWindow - 1, this.totalPages);

    if (endPage - startPage < this.pageWindow - 1) {
      startPage = Math.max(endPage - this.pageWindow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }

    if (endPage < this.totalPages) {
      this.showEllipsis = true;
    }
  }

  sendPage(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.sendPage(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.sendPage(this.currentPage + 1);
    }
  }
}
