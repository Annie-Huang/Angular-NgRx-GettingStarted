import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {ProductService} from "../product.service";
import * as productActions from "./product.actions";
import {map, mergeMap} from "rxjs/operators";
import {Product} from "../product";

@Injectable
export class ProductEffects {

  // In the constructor, we inject the Actions observable from the NgRx library, which emits an action every time
  // one is dispatched in our application. We also inject the ProductService to do the work of fetching our products from the server.
  // We then create an effect by making a variable, we will call it loadProducts$, and registering it with NgRx
  // as an effect by adding an effect decorator on top of it, which comes from the NgRx Effects library.

  // To listen to all actions in our application, we can use the actions$ observable we injected into our effects constructor.
  // However, we need a way to filter out the actions we are not interested in, except for our load action.
  // We can do this with an RxJS operator that comes from NgRx called ofType, which accepts the action type names
  // you want to listen for. We start with a pipe, which is the preferred method for using operators in RxJS 6+,
  // passing in the ofType operator and configuring it to listen for our Load action,
  // which we can access from our ProductActionTypes enum in our productActions file.

  // Now whenever the Load action is dispatched in our application, it will pass through the ofType operator
  // and then we can use the mergeMap operator.
  // MergeMap maps over every emitted action calling Angular services who return observables, then merges these observables into a single stream.
  // So next we call our injected productService's getProducts method, which will call our server and return an array of products or an error.

  // As our service returns an observable of products, we'll need to use another pipe with a map operator
  // to map over the emitted products array and return a LoadSuccess action with the products as its payload.

  // The $ suffix is an optional community convention to show that this variable is an observable
  constructor(private actions$: Actions, private productService: ProductService) { }

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load), //actionType, string. ofType will filter for only Load actionType.
    mergeMap((action: productActions.Load) => this.productService.getProducts().pipe( // Action
      map((products: Product[]) => (new productActions.LoadSuccess(products))) // Action
    ))
  )
}
