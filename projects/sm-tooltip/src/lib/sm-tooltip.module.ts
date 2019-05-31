import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { SmartTooltipDirective } from './directives/smart-tooltip.directive';
import { SmartTooltipComponent } from './components/smart-tooltip/smart-tooltip.component';
import { TooltipOptions } from './model/tooltip-options.interface';
import { SM_TOOLTIP_DEFAULT_OPTIONS } from './consts/smart-tooltip.const';

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

  static forRoot (userDefaultOptions: TooltipOptions = {}): ModuleWithProviders {
    return {
      ngModule: SmTooltipModule,
      providers: [
        { provide: SM_TOOLTIP_DEFAULT_OPTIONS, useValue: userDefaultOptions }
      ]
    }
  }
}
