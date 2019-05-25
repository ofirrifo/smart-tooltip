import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input
} from '@angular/core';

import { mergeDeep } from '../decorators/merge-deep.decorator';
import { PositionStrategyOptions, TooltipOptions } from '../model/tooltip-options.interface';
import { TooltipUtils } from '../utils/tooltip.utils';
import { TOOLTIP_OPTIONS } from '../consts/smart-tooltip.const';
import { SmartTooltipComponent } from '../components/smart-tooltip/smart-tooltip.component';
import { TooltipPosition } from '../model/tooltip-position.interface';


@Directive({
  selector: '[libSmartTooltip]'
})
export class SmartTooltipDirective {

  @Input('libSmartTooltip') text: string;

  @Input()
  @mergeDeep()
  tooltipOptions: TooltipOptions = TooltipUtils.cloneDeep(TOOLTIP_OPTIONS);

  componentRef: any;


  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private elementRef: ElementRef
  ) {
  }

  /**
   * show tooltip.
   *
   * it public in order give from host component execute this method
   * by using @ViewChild(SmartTooltipDirective)
   */
  public showTooltip(): void {
    if (!this.componentRef) {
      this.createTooltip();
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      this.setTooltipStyle(domElem);
      document.body.appendChild(domElem);
    }
  }

  /**
   * hide tooltip.
   *
   * it public in order give from host component execute this method
   * by using @ViewChild(SmartTooltipDirective)
   */
  public hideTooltip(): void {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = void 0;
  }

  private createTooltip(): void {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SmartTooltipComponent)
      .create(this.injector);
    this.componentRef.instance.text = this.text;
  }

  private calcTooltipPos(): TooltipPosition {
    const {x, y, width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    let tooltipPosX;
    let tooltipPosY;
    let transform;
    switch (this.tooltipOptions.positionStrategy) {
      case  PositionStrategyOptions.Top: {
        tooltipPosX = x + (width / 2) + this.tooltipOptions.offset.left;
        tooltipPosY = y + this.tooltipOptions.offset.top;
        transform = 'translate(-50%, -100%)';
        break;
      }
      case  PositionStrategyOptions.Right: {
        tooltipPosX = x + width + this.tooltipOptions.offset.left;
        tooltipPosY = y + (height / 2) + this.tooltipOptions.offset.top;
        transform = 'translateY(-50%)';
        break;
      }
      case  PositionStrategyOptions.Bottom: {
        tooltipPosX = x + (width / 2) + this.tooltipOptions.offset.left;
        tooltipPosY = (y + height) + this.tooltipOptions.offset.top;
        transform = 'translateX(-50%)';
        break;
      }
      case  PositionStrategyOptions.Left: {
        tooltipPosX = x + this.tooltipOptions.offset.left;
        tooltipPosY = y + (height / 2) + this.tooltipOptions.offset.top;
        transform = 'translate(-100%, -50%)';
        break;
      }
    }

    return {left: `${tooltipPosX}px`, top: `${tooltipPosY}px`, transform};
  }

  private setTooltipStyle(domElem: HTMLElement): void {
    this.tooltipOptions.style = {...this.calcTooltipPos(), ...this.tooltipOptions.style};
    Object.keys(this.tooltipOptions.style).forEach((key: string) => {
      domElem.style[key] = this.tooltipOptions.style[key];
    });
  }

}
