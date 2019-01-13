import {Product} from "../product";
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductActions, ProductActionTypes} from "./product.actions";

// app.state + ProductState as the State. Will be use in product-list.component.ts's constructor
export interface State extends fromRoot.State {
  products: ProductState
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};



// Notice this is not export for outside access.
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Just get the showProductCode value from the getProductFeatureState.
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);



// // By typing the initial value, the type is implicitly refer so don't need to put the type
// // state: ProductState => state = initialState
// export function reducer(state = initialState, action): ProductState {
export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {

    // case 'TOGGLE_PRODUCT_CODE':
    case ProductActionTypes.ToggleProductCode:
      // // it will show as:
      // // existing state: undefined
      // // product.reducer.ts:6 payload: true
      // // product.reducer.ts:5 existing state: {"showProductCode":true}
      // // product.reducer.ts:6 payload: false
      // console.log('existing state: ' + JSON.stringify(state));
      // console.log('payload: ' + action.payload);
      return {
        ...state,
        showProductCode: action.payload
      };

    // One important thing to note here, we are passing a reference to our currentProduct into the store.
    // That means if we update a property of the object in our component, we mutate the product in the store as well.
    // To prevent this, we make a copy of the object here, using the spread operator.
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
      
    default:
      return state;
  }
}
