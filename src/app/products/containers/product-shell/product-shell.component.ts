import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import { Product } from '../../product';
import { ProductService } from '../../product.service';

import { Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  // errorMessage$: Observable<string>;
  // products$: Observable<Product[]>;
  // componentActive = true;
  // // errorMessage: string;
  // displayCode: boolean;
  // products: Product[];
  //
  // // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  // // sub: Subscription;

  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<fromProduct.State>, private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));

    // // this.sub = this.productService.selectedProductChanges$.subscribe(
    // //   selectedProduct => this.selectedProduct = selectedProduct
    // // );
    // /*
    //     this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
    //       currentProduct => this.selectedProduct = currentProduct
    //     );
    // */
    // // Done: Unsubscribe
    // this.store.pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.componentActive)).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    //
    // this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    //
    //
    // // this.productService.getProducts().subscribe(
    // //   (products: Product[]) => this.products = products,
    // //   (err: any) => this.errorMessage = err.error
    // // );
    // this.store.dispatch(new productActions.Load());
    //
    // // this.store.pipe(select(fromProduct.getProducts))
    // //   .subscribe((products: Product[]) => this.products = products);
    // /*    // !!! Important: Keep in mind that is not subscribe the check the change on the obersable, this is not remove the products from the store.
    //     this.store.pipe(select(fromProduct.getProducts), takeWhile(() => this.componentActive))   // Check out the takeFirst and takeUntil method.
    //       .subscribe((products: Product[]) => this.products = products);*/
    // // this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    //
    //
    // // this.store.pipe(select('products')).subscribe(
    // //   products => {
    // //     // Need to make sure products slice from state exists first.
    // //     if (products) {
    // //       this.displayCode = products.showProductCode;
    // //     }
    // //   });
    // /*
    //     // Don't need to check the if condition (see above) because initialize state was set.
    //     this.store.pipe(select('products')).subscribe(
    //       products => this.displayCode = products.showProductCode
    //       );
    // */
    // // this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
    // //   showProductCode => this.displayCode = showProductCode
    // // );
    // // Done: Unsubscribe
    // this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.componentActive)).subscribe(
    //   showProductCode => this.displayCode = showProductCode
    // );
  }

  // ngOnDestroy(): void {
  //   // this.sub.unsubscribe();
  //   this.componentActive = false;
  // }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    /*    this.store.dispatch({
          type: 'TOGGLE_PRODUCT_CODE',
          payload: value
        });*/
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
}
