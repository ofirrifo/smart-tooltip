import { NgModule } from '@angular/core';
import { SmartTooltipDirective } from './directives/smart-tooltip.directive';
import { SmartTooltipComponent } from './components/smart-tooltip/smart-tooltip.component';

@NgModule({
  imports: [],
  declarations: [SmartTooltipDirective, SmartTooltipComponent],
  exports: [SmartTooltipDirective],
  entryComponents: [SmartTooltipComponent]
})
export class SmTooltipModule {
}
