import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartTooltipDirective } from './lib/smart-tooltip.directive';
import { SmartTooltipComponent } from './lib/smart-tooltip/smart-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartTooltipDirective,
    SmartTooltipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SmartTooltipComponent]
})
export class AppModule { }
