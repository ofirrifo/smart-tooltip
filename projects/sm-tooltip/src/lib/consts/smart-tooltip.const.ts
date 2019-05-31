import { PositionStrategyOptions, TooltipOptions } from '../model/tooltip-options.interface';
import { SmartTooltipComponent } from '../components/smart-tooltip/smart-tooltip.component';
import { InjectionToken } from '@angular/core';

export const TOOLTIP_OPTIONS: TooltipOptions = {
  style: {
    position: 'absolute',
    zIndex: 2147483638
  },
  offset: {
    left: void 0,
    top: void 0
  },
  positionStrategy: PositionStrategyOptions.Bottom,
  showArrow: true,
  delay: {
    show: 700,
    hide: 300
  },
  customTooltipComp: SmartTooltipComponent
};

export const SM_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken<string>('SM_TOOLTIP_DEFAULT_OPTIONS');
