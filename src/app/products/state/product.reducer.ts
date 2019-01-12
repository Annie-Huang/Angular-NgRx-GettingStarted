import {Product} from "../product";
import * as fromRoot from '../../state/app.state';

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

// By typing the initial value, the type is implicitly refer so don't need to put the type
// state: ProductState => state = initialState
export function reducer(state = initialState, action): ProductState {
  switch (action.type) {

    case 'TOGGLE_PRODUCT_CODE':
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

    default:
      return state;
  }
}
