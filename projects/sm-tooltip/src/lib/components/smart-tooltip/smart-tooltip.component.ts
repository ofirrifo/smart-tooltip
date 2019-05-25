import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-smart-tooltip',
  templateUrl: './smart-tooltip.component.html',
  styleUrls: ['./smart-tooltip.component.scss']
})
export class SmartTooltipComponent implements OnInit {
  @Input() text: string;

  constructor() {
  }

  ngOnInit() {
  }

}
