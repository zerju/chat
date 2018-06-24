import {NgModule} from '@angular/core';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';

import {AuthState} from './states/auth.state';
import {ContactsState} from './states/contacts.state';
import {MessagesState} from './states/messages.state';

const STATES = [AuthState, ContactsState, MessagesState];

@NgModule({
  providers: [],
  imports: [NgxsModule.forRoot(STATES), NgxsStoragePluginModule.forRoot()]
})
export class CoreStateModule {
}
