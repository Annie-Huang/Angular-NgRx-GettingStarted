import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

/*

Steps to build strongly type state:
===============================================
Strongly type the user state
Build selectors for maskUserName and currentUser
Modify the reducer to use the strongly typed state
Modify the login component to use the strongly typed state and selector

Steps to change the action creator:
=============================================
Create an user.actions.ts file
Add an enumfor the action type (MaskUserName)
Build the associated action creator
Create a union type for the action creators
Modify the reducer to use the union type
Modify the login component to use the action creator

*/



export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  CreateProductFail = '[Product] Create Product Fail',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail'
}

// Action Creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  // // Don't need it because typescript provides a empty constructor by default
  // constructor() { }
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;

  // // Don't need it because typescript provides a empty constructor by default
  // constructor() { }
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) { }
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) { }
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) { }
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor(public payload: string) { }
}

export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CreateProduct;

  constructor(public payload: Product) { }
}

export class CreateProductSuccess implements Action {
  readonly type = ProductActionTypes.CreateProductSuccess;

  constructor(public payload: Product) { }
}

export class CreateProductFail implements Action {
  readonly type = ProductActionTypes.CreateProductFail;

  constructor(public payload: string) { }
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: number) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DeleteProductSuccess;

  constructor(public payload: number) { }
}

export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DeleteProductFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type ProductActions = ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail
  | CreateProduct
  | CreateProductSuccess
  | CreateProductFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail;

