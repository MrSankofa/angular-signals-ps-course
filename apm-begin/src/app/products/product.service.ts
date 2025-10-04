import { Injectable } from '@angular/core';
import {httpResource} from '@angular/common/http';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: []});

  // this allows for us to get the products when we want. not when the productService is initialized
  // actually this is the reference. This createProducts is called each time you go to the page.
  // createProducts() {
  //   return httpResource<Product []>(() => this.productsUrl, {defaultValue: []})
  // }

}
