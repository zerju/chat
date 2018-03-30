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
import {AddToGroupComponent} from './add-to-group/add-to-group.component';
import {PipesModule} from '../pipes/pipes.module';

const COMPONENTS: any[] = [
  FooterComponent,
  HeaderComponent,
  ContactPanelComponent,
  MessagePanelComponent,
  LayoutComponent,
  CreateGroupComponent,
  AddContactComponent,
  AutocompleteAddComponent,
  AddToGroupComponent
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
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
