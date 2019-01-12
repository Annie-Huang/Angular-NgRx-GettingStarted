export function reducer(state, action) {
  switch (action.type) {

    case 'MASK_USER_NAME':
      // // it will show as:
      // // existing state: undefined
      // // product.reducer.ts:6 payload: true
      // // product.reducer.ts:5 existing state: {"showProductCode":true}
      // // product.reducer.ts:6 payload: false
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
