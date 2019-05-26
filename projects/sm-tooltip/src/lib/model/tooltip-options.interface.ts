export interface TooltipOffset {
  left: number;
  top: number;
}

export enum PositionStrategyOptions {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum ArrowStrategyOptions {
  TopArrow = 'top-arrow',
  RightArrow = 'right-arrow',
  BottomArrow = 'bottom-arrow',
  LeftArrow = 'left-arrow',
}

export interface TooltipDelay {
  show?: number; // in ms
  hide?: number; // in ms
}

export interface TooltipOptions {
  style?: Record<string, any>;
  offset?: TooltipOffset;
  positionStrategy?: PositionStrategyOptions; // by default bottom
  showArrow?: boolean; // by default true
  delay?: TooltipDelay;
  customTooltipComp?: any;
}
