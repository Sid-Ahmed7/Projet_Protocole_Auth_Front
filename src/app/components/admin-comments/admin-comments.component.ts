import { Component } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
    selector: 'app-admin-comments',
    standalone: true,
    templateUrl: './admin-comments.component.html',
    styleUrl: './admin-comments.component.scss',
    imports: [RatingComponent, PaginationComponent]
})
export class AdminCommentsComponent {

}
