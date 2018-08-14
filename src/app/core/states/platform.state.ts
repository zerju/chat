import {Action, State, StateContext, Store} from '@ngxs/store';
import {GetPlatformAction} from '../actions/platform.action';

declare const navigator: any;

export interface PlatformStateModel {
  mobile?: boolean;
  desktop?: boolean;
  android?: boolean;
  ios?: boolean;
  windows?: boolean;
  linux?: boolean;
  macOs?: boolean;
}

@State
<PlatformStateModel>(
    {name: 'platformState', defaults: {}}) export class PlatformState {
  constructor(private _store: Store) {}

  @Action(GetPlatformAction)
  findContacts(ctx: StateContext<PlatformStateModel>,
               action: GetPlatformAction) {
    const state = ctx.getState();
    const platform: PlatformStateModel = {};
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      platform.mobile = true;
      platform.android = true;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      platform.mobile = true;
      platform.ios = true;
    } else if (/Linux/.test(userAgent)) {
      platform.desktop = true;
      platform.linux = true;
    } else if (/Win/.test(userAgent)) {
      platform.desktop = true;
      platform.windows = true;
    } else if (/Mac/.test(userAgent)) {
      platform.desktop = true;
      platform.macOs = true;
    }
    ctx.setState(platform);
  }
}
