import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatIconModule,
  MatTooltipModule,
  MatButtonModule
} from '@angular/material';

import {DirectivesModule} from '../directives/directives.module';
import {PipesModule} from '../pipes/pipes.module';

import {AddContactComponent} from './add-contact/add-contact.component';
import {AddToGroupComponent} from './add-to-group/add-to-group.component';
import {
  AutocompleteAddComponent
} from './autocomplete-add/autocomplete-add.component';
import {ContactPanelComponent} from './contact-panel/contact-panel.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from './layout/layout.component';
import {MenuComponent} from './menu/menu.component';
import {MessagePanelComponent} from './message-panel/message-panel.component';
import {
  ContactRequestComponent
} from './contact-request/contact-request.component';

const COMPONENTS: any[] = [
  FooterComponent,
  HeaderComponent,
  ContactPanelComponent,
  MessagePanelComponent,
  LayoutComponent,
  CreateGroupComponent,
  AddContactComponent,
  AutocompleteAddComponent,
  AddToGroupComponent,
  MenuComponent,
  ContactRequestComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    PipesModule,
    DirectivesModule,
    MatButtonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
