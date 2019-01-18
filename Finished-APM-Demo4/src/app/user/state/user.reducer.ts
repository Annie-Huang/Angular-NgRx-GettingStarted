import {User} from '../user';
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserActions, UserActionTypes} from './user.actions';


export interface State extends fromRoot.State {
  users: UserState;
}
// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

// I thought 'users' is the reason why we need to create a State that extends fromRoot.State. Because the app.state.ts has 'user', not 'users'.
//    Not sure why the Final APM-Demo2's login.component.ts's constructor can use the one from the app.module.ts directly.
// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);
export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);



// export function reducer(state = initialState, action): UserState {
export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {

    // case 'MASK_USER_NAME':
    case UserActionTypes.MaskUserName:
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
