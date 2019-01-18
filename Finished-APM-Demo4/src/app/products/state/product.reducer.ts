import { Product } from '../product';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';
import * as fromRoot from '../../state/app.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.

// app.state + ProductState as the State. Will be use in product-list.component.ts's constructor
export interface State extends fromRoot.State {
  products: ProductState
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  // currentProduct: Product;
  currentProductId: number | null;
  products: Product[];
  error: string
}

const initialState: ProductState = {
  showProductCode: true,
  // currentProduct: null,
  currentProductId: null,
  products: [],
  error: ''
};



// Notice this is not export for outside access.
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Need to create one selector for each property in the ProductState.
// Just get the showProductCode value from the getProductFeatureState.
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);
// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   state => state.currentProduct
// );
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      // When it gets to here, the currentProductId will either be a non-zero number, or null.
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);
export const getError = createSelector(
  getProductFeatureState,
  state => state.error
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

    // // One important thing to note here, we are passing a reference to our currentProduct into the store.
    // // That means if we update a property of the object in our component, we mutate the product in the store as well.
    // // To prevent this, we make a copy of the object here, using the spread operator.
    // case ProductActionTypes.SetCurrentProduct:
    //   return {
    //     ...state,
    //     currentProduct: { ...action.payload }
    //   };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };

    // case ProductActionTypes.ClearCurrentProduct:
    //   return {
    //     ...state,
    //     currentProduct: null
    //   };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    // case ProductActionTypes.InitializeCurrentProduct:
    //   return {
    //     ...state,
    //     currentProduct: {
    //       id: 0,
    //       productName: '',
    //       productCode: 'New',
    //       description: '',
    //       starRating: 0
    //     }
    //   };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      // The map() method creates a new array with the results of calling a provided function on every element in the calling array.
      const updatedProducts = state.products.map(item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentProduct is the new product.
    case ProductActionTypes.CreateProductSuccess:
      // const newProducts = state.products.concat(action.payload);
      // products: newProducts,
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentProduct is null.
    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
