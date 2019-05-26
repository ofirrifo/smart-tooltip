import { PositionStrategyOptions, TooltipOptions } from '../model/tooltip-options.interface';

export const TOOLTIP_OPTIONS: TooltipOptions = {
  style: {
    position: 'absolute',
    zIndex: 1000
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
  }
};
