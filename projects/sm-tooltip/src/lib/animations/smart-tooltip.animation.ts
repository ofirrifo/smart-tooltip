import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger, } from '@angular/animations';

export const smTooltipAnimations: {
  readonly tooltipState: AnimationTriggerMetadata;
} = {
  /** Animation that transitions a tooltip in. */
  tooltipState: trigger('state', [
    transition(':enter', animate('400ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
      style({opacity: 0, transform: 'scale(0)', offset: 0}),
      style({opacity: 0.5, transform: 'scale(0.99)', offset: 0.5}),
      style({opacity: 1, transform: 'scale(1)', offset: 1})
    ])))
  ])
};
