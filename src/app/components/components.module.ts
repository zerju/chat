import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ContactPanelComponent} from './contact-panel/contact-panel.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from './layout/layout.component';
import {MessagePanelComponent} from './message-panel/message-panel.component';

const COMPONENTS: any[] = [
  FooterComponent, HeaderComponent, ContactPanelComponent,
  MessagePanelComponent, LayoutComponent
];

@NgModule(
    {imports: [CommonModule], declarations: COMPONENTS, exports: COMPONENTS})
export class ComponentsModule {}
