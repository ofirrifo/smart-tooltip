import { TooltipOptions } from '../model/tooltip-options.interface';

export const TOOLTIP_OPTIONS: TooltipOptions = {
  style: {
    position: 'absolute',
    zIndex: 1000,
    transform: 'translateX(-50%)'
  },
  offset: {
    left: 0,
    top: 0
  }
};
