import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatTooltipModule} from '@angular/material';

import {ContactPanelComponent} from './contact-panel/contact-panel.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from './layout/layout.component';
import {MessagePanelComponent} from './message-panel/message-panel.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {AddContactComponent} from './add-contact/add-contact.component';
import {
  AutocompleteAddComponent
} from './autocomplete-add/autocomplete-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const COMPONENTS: any[] = [
  FooterComponent,
  HeaderComponent,
  ContactPanelComponent,
  MessagePanelComponent,
  LayoutComponent,
  CreateGroupComponent,
  AddContactComponent,
  AutocompleteAddComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
