import { Injectable } from '@angular/core';
import {httpResource} from '@angular/common/http';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: []});


}
