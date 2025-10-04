import {Component, computed, inject, linkedSignal, Signal, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductData} from '../product-data';
import {Product} from '../product';
import {CurrencyPipe} from '@angular/common';
import {ProductService} from '../product.service';

// NOTE: two way binding with ngModel in the template requires the FormsModule
@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  // TODO: what is the difference between inject and constructor
  private productService = inject(ProductService);

  products = this.productService.productsResource.value

  selectedProduct: WritableSignal<Product | undefined> = signal(undefined);

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

}

// test
