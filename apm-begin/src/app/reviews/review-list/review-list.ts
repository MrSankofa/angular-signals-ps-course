import {Component, computed, inject} from '@angular/core';
import {ReviewService} from '../review.service';

@Component({
  selector: 'app-review-list',
  imports: [],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList {
  private reviewsService = inject(ReviewService);

  reviews = this.reviewsService.reviewsResource.value;

  isLoading = this.reviewsService.reviewsResource.isLoading;

  error = this.reviewsService.reviewsResource.error;


  errorMessage = computed(() => this.error ? this.error()?.message : '');



}
