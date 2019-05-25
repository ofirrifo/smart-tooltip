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
import { SmartTooltipComponent } from './smart-tooltip/smart-tooltip.component';
import { TooltipPosition } from './model/tooltip-position.interface';
import { TooltipOptions } from './model/tooltip-options.interface';
import { TooltipUtils } from './utils/tooltip.utils';
import { TOOLTIP_OPTIONS } from './consts/smart-tooltip.const';
import { mergeDeep } from './decorators/merge-deep.decorator';

@Directive({
  selector: '[appSmartTooltip]'
})
export class SmartTooltipDirective {

  @Input('appSmartTooltip') text: string;

  @Input()
  @mergeDeep()
  tooltipOptions: TooltipOptions = TooltipUtils.cloneDeep(TOOLTIP_OPTIONS);

  componentRef: any;


  @HostListener('mouseenter')
  onMouseEnter() {
    this.createTooltip();
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.setTooltipStyle(domElem);
    document.body.appendChild(domElem);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private elementRef: ElementRef
  ) {
  }

  createTooltip(): void {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SmartTooltipComponent)
      .create(this.injector);
    this.componentRef.instance.text = this.text;
  }

  calcTooltipPos(): TooltipPosition {
    const {x, y, width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPosX = x + (width / 2) + this.tooltipOptions.offset.left;
    const tooltipPosY = (y + height) + this.tooltipOptions.offset.top;
    return {left: `${tooltipPosX}px`, top: `${tooltipPosY}px`};
  }

  setTooltipStyle(domElem: HTMLElement): void {
    this.tooltipOptions.style = {...this.calcTooltipPos(), ...this.tooltipOptions.style};
    Object.keys(this.tooltipOptions.style).forEach((key: string) => {
      domElem.style[key] = this.tooltipOptions.style[key];
    });
  }

}
