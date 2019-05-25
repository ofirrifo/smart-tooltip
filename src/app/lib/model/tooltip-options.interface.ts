export interface TooltipOffset {
  left: number;
  top: number;
}

export interface TooltipOptions {
  style: Record<string, any>;
  offset?: TooltipOffset;
}
