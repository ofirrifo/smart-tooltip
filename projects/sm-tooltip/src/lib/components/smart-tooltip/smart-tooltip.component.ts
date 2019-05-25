import { Component, Input, OnInit } from '@angular/core';
import { ArrowStrategyOptions } from '../../model/tooltip-options.interface';

@Component({
  selector: 'lib-smart-tooltip',
  templateUrl: './smart-tooltip.component.html',
  styleUrls: ['./smart-tooltip.component.scss']
})
export class SmartTooltipComponent implements OnInit {
  @Input() text: string;
  @Input() arrowStrategy: ArrowStrategyOptions;

  constructor() {
  }

  ngOnInit() {
  }

}
