import { Component, Input, OnInit } from '@angular/core';
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


  constructor() {}

  ngOnInit() {}

}
