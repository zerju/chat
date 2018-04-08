import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule, MetaReducer, ActionReducer, compose, combineReducers } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './reducers/auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer
};
const localStorageSyncReducer: ActionReducer<AppState> = compose(
  localStorageSync({
    keys: ['authState'],
    rehydrate: true
  }),
  combineReducers)(reducers);

export function reducer(reducer2: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return localStorageSyncReducer(state, action);
  };
}
const meta_reducers: MetaReducer<any>[] = [reducer];

@NgModule({ imports: [StoreModule.forRoot(reducers, {metaReducers: meta_reducers})]})
export class CoreReducersModule {

}
