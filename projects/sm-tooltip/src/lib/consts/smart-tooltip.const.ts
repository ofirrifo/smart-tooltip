import { PositionStrategyOptions, TooltipOptions } from '../model/tooltip-options.interface';

export const TOOLTIP_OPTIONS: TooltipOptions = {
  style: {
    position: 'absolute',
    zIndex: 1000
  },
  offset: {
    left: 0,
    top: 0
  },
  positionStrategy: PositionStrategyOptions.Bottom,
  showArrow: true
};
