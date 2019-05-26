import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { SmartTooltipDirective } from './directives/smart-tooltip.directive';
import { SmartTooltipComponent } from './components/smart-tooltip/smart-tooltip.component';

@NgModule({
  imports: [],
  declarations: [SmartTooltipDirective, SmartTooltipComponent],
  exports: [SmartTooltipDirective],
  entryComponents: [SmartTooltipComponent]
})
export class SmTooltipModule {
  static withComponents(components: any[]) {
    return {
      ngModule: SmTooltipModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    }
  }
}
