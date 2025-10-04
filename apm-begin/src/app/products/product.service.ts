import { Injectable } from '@angular/core';
import {httpResource} from '@angular/common/http';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  //: ToDO: Is this a signal?
  productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: []});

  // this allows for us to get the products when we want. not when the productService is initialized
  // createProducts() {
  //   return httpResource<Product []>(() => this.productsUrl, {defaultValue: []})
  // }

}
