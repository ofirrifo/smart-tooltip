import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ArrowStrategyOptions } from '../../model/tooltip-options.interface';
import { smTooltipAnimations } from '../../animations/smart-tooltip.animation';

@Component({
  selector: 'lib-smart-tooltip',
  templateUrl: './smart-tooltip.component.html',
  styleUrls: ['./smart-tooltip.component.scss'],
  animations: [smTooltipAnimations.tooltipState],
})
export class SmartTooltipComponent implements OnInit {
  @Input() text: string;
  @Input() arrowStrategy: ArrowStrategyOptions;


  animationVisibilityState = 'initial';


  constructor(private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.animationVisibilityState = 'visible';
      // for case the host component is on push
      this.cdr.markForCheck();
    });
  }

}
