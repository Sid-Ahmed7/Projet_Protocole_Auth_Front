import { Component } from '@angular/core';
import { RatingComponent } from "../rating/rating.component";

@Component({
    selector: 'app-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    imports: [RatingComponent]
})
export class CommentComponent {
game: any;

}
