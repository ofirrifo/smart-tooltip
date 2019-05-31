import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Inject,
  Injector,
  Input,
  Optional
} from '@angular/core';

import { mergeDeep } from '../decorators/merge-deep.decorator';
import { ArrowStrategyOptions, PositionStrategyOptions, TooltipOptions } from '../model/tooltip-options.interface';
import { TooltipUtils } from '../utils/tooltip.utils';
import { SM_TOOLTIP_DEFAULT_OPTIONS, TOOLTIP_OPTIONS } from '../consts/smart-tooltip.const';
import { TooltipPosition } from '../model/tooltip-position.interface';


@Directive({
  selector: '[libSmartTooltip]'
})
export class SmartTooltipDirective {

  @Input('libSmartTooltip') text: string;

  private readonly defaultTooltipOptions = TooltipUtils.mergeDeep(TooltipUtils.cloneDeep(TOOLTIP_OPTIONS, 'customTooltipComp'), this.userDefaultOptions);

  @Input()
  @mergeDeep()
  tooltipOptions: TooltipOptions = this.defaultTooltipOptions;

  private componentRef: any;
  private showTimeoutId: any;
  private hideTimeoutId: any;


  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  constructor(
    @Optional() @Inject(SM_TOOLTIP_DEFAULT_OPTIONS) private userDefaultOptions: TooltipOptions = {},
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef
  ) {}

  /**
   * show tooltip.
   *
   * it public in order give from host component execute this method
   * by using @ViewChild(SmartTooltipDirective)
   *
   * tooltip will display only if still not display and we have text to display
   */
  public showTooltip(): void {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
    if (!this.componentRef && this.getTextToDisplay()) {
      this.showTimeoutId = setTimeout(() => {
        this.createTooltip();
        this.appRef.attachView(this.componentRef.hostView);
        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.setTooltipStyle(domElem);
        document.body.appendChild(domElem);
      }, this.tooltipOptions.delay.show);
    }
  }

  /**
   * hide tooltip.
   *
   * it public in order give from host component execute this method
   * by using @ViewChild(SmartTooltipDirective)
   */
  public hideTooltip(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }

    this.hideTimeoutId = setTimeout(() => {
      if (this.componentRef) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = void 0;
      }

    }, this.tooltipOptions.delay.hide);
  }

  private createTooltip(): void {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(this.tooltipOptions.customTooltipComp)
      .create(this.injector);
    this.componentRef.instance.text = this.getTextToDisplay();
    if (this.tooltipOptions.showArrow) {
      let arrowStrategy;
      switch (this.tooltipOptions.positionStrategy) {
        case  PositionStrategyOptions.Top: {
          arrowStrategy = ArrowStrategyOptions.BottomArrow;
          break;
        }
        case  PositionStrategyOptions.Right: {
          arrowStrategy = ArrowStrategyOptions.LeftArrow;
          break;
        }
        case  PositionStrategyOptions.Bottom: {
          arrowStrategy = ArrowStrategyOptions.TopArrow;
          break;
        }
        case  PositionStrategyOptions.Left: {
          arrowStrategy = ArrowStrategyOptions.RightArrow;
          break;
        }
      }
      this.componentRef.instance.arrowStrategy = arrowStrategy;
    }
  }

  private calcTooltipPos(): TooltipPosition {
    const {x, y, width, height} = this.elementRef.nativeElement.getBoundingClientRect();
    let tooltipPosX;
    let tooltipPosY;
    let transform;
    this.initOffset();
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

  /**
   * get text to display in tooltip
   * in case text is given from the host component we display the given text
   * else we use the innerText if exist
   */
  private getTextToDisplay(): string {
    return this.text || this.elementRef.nativeElement.innerText;
  }

  initOffset(): void {
    const offset = 10;
    switch (this.tooltipOptions.positionStrategy) {
      case  PositionStrategyOptions.Top: {
        if (TooltipUtils.isNil(this.tooltipOptions.offset.top)) {
          this.tooltipOptions.offset.top = -offset;
        }
        if (TooltipUtils.isNil(this.tooltipOptions.offset.left)) {
          this.tooltipOptions.offset.left = 0;
        }
        break;
      }
      case  PositionStrategyOptions.Right: {
        if (TooltipUtils.isNil(this.tooltipOptions.offset.left)) {
          this.tooltipOptions.offset.left = offset;
        }
        if (TooltipUtils.isNil(this.tooltipOptions.offset.top)) {
          this.tooltipOptions.offset.top = 0;
        }
        break;
      }
      case  PositionStrategyOptions.Bottom: {
        if (TooltipUtils.isNil(this.tooltipOptions.offset.top)) {
          this.tooltipOptions.offset.top = offset;
        }
        if (TooltipUtils.isNil(this.tooltipOptions.offset.left)) {
          this.tooltipOptions.offset.left = 0;
        }
        break;
      }
      case  PositionStrategyOptions.Left: {
        if (TooltipUtils.isNil(this.tooltipOptions.offset.left)) {
          this.tooltipOptions.offset.left = -offset;
        }
        if (TooltipUtils.isNil(this.tooltipOptions.offset.top)) {
          this.tooltipOptions.offset.top = 0;
        }
        break;
      }
    }

  }

}
