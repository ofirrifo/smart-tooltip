import { Component } from '@angular/core';
import { PositionStrategyOptions, TooltipOptions } from '../../projects/sm-tooltip/src/lib/model/tooltip-options.interface';
import { MyTooltipComponent } from './my-tooltip/my-tooltip.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tooltipOptions: TooltipOptions = {
    positionStrategy: PositionStrategyOptions.Top,
    customTooltipComp: MyTooltipComponent,
    delay: {hide: 4000}
  };
}
