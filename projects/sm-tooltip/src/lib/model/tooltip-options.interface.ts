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

export interface TooltipOptions {
  style: Record<string, any>;
  offset?: TooltipOffset;
  positionStrategy?: PositionStrategyOptions;
}
