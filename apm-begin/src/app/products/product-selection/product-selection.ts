import {Component, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductData} from '../product-data';
import {Product} from '../product';

// NOTE: two way binding with ngModel in the template requires the FormsModule
@Component({
  selector: 'app-product-selection',
  imports: [FormsModule],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  quantity: WritableSignal<number> = signal(1);

  products: WritableSignal<Product[]> = signal(ProductData.products);

  selectedProduct: WritableSignal<Product | undefined> = signal(undefined);

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
