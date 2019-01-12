import {Product} from "../product";

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}


export function reducer(state, action) {
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
