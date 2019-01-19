import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Product} from "../../../../../APM-Demo5/src/app/products/product";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
