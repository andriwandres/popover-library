import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PopoverDirective } from './directives/popover.directive';
import { PopoverComponent } from './components/popover/popover.component';
import { PopoverContainerComponent } from './components/popover-container/popover-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PopoverDirective,
    PopoverComponent,
    PopoverContainerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
