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
import { TooltipOptions } from '../model/tooltip-options.interface';
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

  public showTooltip(): void {
    this.createTooltip();
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.setTooltipStyle(domElem);
    document.body.appendChild(domElem);
  }

  public hideTooltip(): void {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  private createTooltip(): void {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SmartTooltipComponent)
      .create(this.injector);
    this.componentRef.instance.text = this.text;
  }

  private calcTooltipPos(): TooltipPosition {
    const {x, y, width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPosX = x + (width / 2) + this.tooltipOptions.offset.left;
    const tooltipPosY = (y + height) + this.tooltipOptions.offset.top;
    return {left: `${tooltipPosX}px`, top: `${tooltipPosY}px`};
  }

  private setTooltipStyle(domElem: HTMLElement): void {
    this.tooltipOptions.style = {...this.calcTooltipPos(), ...this.tooltipOptions.style};
    Object.keys(this.tooltipOptions.style).forEach((key: string) => {
      domElem.style[key] = this.tooltipOptions.style[key];
    });
  }

}
