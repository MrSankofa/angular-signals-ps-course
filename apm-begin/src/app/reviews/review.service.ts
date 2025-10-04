import {effect, inject, Injectable} from '@angular/core';
import {ProductService} from '../products/product.service';
import {httpResource} from '@angular/common/http';
import {Review} from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';

  private productService = inject(ProductService);

  eff = effect(() => console.log("Loading reviews", this.reviewsResource.isLoading()));

  // TODO: handling when the id is undefined.
  reviewsResource = httpResource<Review[]>(() => {
      const p = this.productService.selectedProduct();

      return p ?
       `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` :
        undefined;
    }, { defaultValue: []}
  );

}
