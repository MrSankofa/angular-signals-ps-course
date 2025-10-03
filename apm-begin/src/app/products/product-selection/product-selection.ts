import {Component, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';

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

}

// test
