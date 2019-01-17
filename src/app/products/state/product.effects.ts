import {Injectable} from "@angular/core";
import {ProductService} from "../product.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Product} from "../product";

/* NgRx */
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as productActions from "./product.actions";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";

@Injectable()
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
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load), //actionType, string. ofType will filter for only Load actionType.
    mergeMap((action: productActions.Load) =>   // Action
      this.productService.getProducts().pipe(
        map((products: Product[]) => (new productActions.LoadSuccess(products))), // Action
        catchError(err => of(new productActions.LoadFail(err)))
    ))
  );

  // We start with the Effect decorator and define a property that provides an observable of action.
  // This new property watches for actions of type UpdateProduct.
  // When it receives one, it maps the action to pull off the payload, which, if you recall, is the product to update.
  // We then call our productService updateProduct method and pass in that product.
  // 
  // However, that service call also returns an observable. We don't want nested observables here,
  // so we use mergeMap to merge and flatten the two observables,
  // the one from our action (this.actions$) and
  // the one from our product service (this.productService.updateProduct(product)).
  @Effect()
  updateProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct), //actionType, string. ofType will filter for only Load actionType.
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>   // Action
      this.productService.updateProduct(product).pipe(
        map((updatedProduct: Product) => (new productActions.UpdateProductSuccess(updatedProduct))), // Action
        catchError(err => of(new productActions.UpdateProductFail(err)))
      ))
  )

  /*
RxJS Operators
switchMap:  << Least use one.
  Cancels the current subscription/request and can cause race condition
  Use for get requests or cancelable requests like searches
  It cancels the current subscription if a new value is emitted. This means if someone dispatches, for example,
    a second save product action before the first save product action's HTTP request returns to your effect,
    the first in-flight HTTP request will be canceled and the product might not get saved, leading to potential race conditions.

concatMap   << Least performance, but the safest.
  Runs subscriptions/requests in order and is less performant
  Use for get, post and put requests when order is important

mergeMap  << Most cases
  Runs subscriptions/requests in parallel
  Use for put, post and delete methods when order is not important
  We used an RxJS merge map operator in our effect to map over our current actions observable
    and merge any inner observables returned from calling our Angular service into a single observable stream,
    which most of the time will likely be the operator you want, but not always.

exhaustMap  << Use for login
  Ignores all subsequent subscriptions/requests until it completes
  Use for login when you do not want more requests until the initial one is complete
*/


}
