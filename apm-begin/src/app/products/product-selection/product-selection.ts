import {Component, computed, inject, linkedSignal, Signal, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductData} from '../product-data';
import {Product} from '../product';
import {CurrencyPipe} from '@angular/common';
import {ProductService} from '../product.service';
import {ReviewList} from '../../reviews/review-list/review-list';
import {filter, fromEvent, tap} from 'rxjs';

// NOTE: two way binding with ngModel in the template requires the FormsModule
@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe, ReviewList],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  // TODO: what is the difference between inject and constructor
  private productService = inject(ProductService);

  // productsResource = this.productService.createProducts();
  //
  // products = this.productsResource.value
  products = this.productService.productsResource.value

  isLoading = this.productService.productsResource.isLoading;

  error = this.productService.productsResource.error;

  showHelp = signal(false);
  questionMark$ = fromEvent<KeyboardEvent>(document, 'keydown');

  questionSubscription = this.questionMark$.pipe(
    filter(key => key.key === '?' || key.key === 'Escape'),
    tap((key) => key.key === '?' ? this.showHelp.update( show => !show ) : this.showHelp.set(false)),
    tap((key) => key.key === 'Escape' ? this.showHelp.set(false) : null)

  ).subscribe()

  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  selectedProduct = this.productService.selectedProduct;

  quantity: WritableSignal<number> = linkedSignal({
    source: this.selectedProduct,
    computation: () => {
      return 1;
    }
  })

  total: Signal<number> = computed(() => ((this.selectedProduct()?.price ?? 0) * this.quantity()) );
  color: Signal<string> = computed(() => this.total() > 200 ? 'green' : 'blue');

  onDecrease() {
    this.quantity.update(currentQuantity => {
      if(currentQuantity > 0) {
        return currentQuantity - 1;
      }
      return currentQuantity;
    });
  }

  onIncrease() {
    this.quantity.update(currentQuantity =>
      currentQuantity < 10 ? currentQuantity + 1 : currentQuantity
    );
  }

  onDestroy() {
    this.questionSubscription.unsubscribe();
  }
}

// test
