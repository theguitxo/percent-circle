import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

function isValidColor(color: string): boolean {
  const element: HTMLElement = document.createElement('div');
  element.style.fill = color;
  return (element.style.fill !== '');
}

@Component({
  selector: 'app-percentage-circle',
  templateUrl: './percentage-circle.component.html',
  styleUrls: ['./percentage-circle.component.scss']
})
export class PercentageCircleComponent implements OnInit, AfterViewInit, OnChanges {

  @Input('size') set size(value: number) {
    if (value !== undefined &&
        !Number.isNaN(Number.parseFloat(value as any)) &&
        value > 0) {
      this.pSize = value;
    }
  }
  @Input('percentage') set percentage(value: number) {
    if (Number.isNaN(Number.parseFloat(value as any))) {
      this.pPercent = 0;
    } else if (value < 0) {
      this.pPercent = 0;
    } else if (value > 100) {
      this.pPercent = 100;
    } else {
      this.pPercent = value;
    }
  }
  @Input() animate: boolean;
  @Input() showNumber: boolean;
  @Input() backgroundImage: string;
  @Input() backgroundFilter: boolean;
  @Input('percentColor') set percentColor(value: string) {
    if (isValidColor(value)) {
      this.pPercentColor = value;
    }
  }
  get percentColor(): string {
    return this.pPercentColor;
  }
  @Input('backgroundColor') set backgroundColor(value: string) {
    if (isValidColor(value)) {
      this.pBackgroundColor = value;
    }
  }
  get backgroundColor(): string {
    return this.pBackgroundColor;
  }
  @Input('percentTextColor') set percentTextColor(value: string) {
    if (isValidColor(value)) {
      this.pPercentTextColor = value;
    }
  }
  get percentTextColor(): string {
    return this.pPercentTextColor;
  }

  private pSize = 200;
  private pPercent: number;
  private pInset: string;
  private pPercentColor = '#E8E85A';
  private pBackgroundColor = '#EEEEEE';
  private pPercentTextColor = '#000000';

  get sizeStyle(): string {
    return `${this.pSize}px`;
  }
  get inset(): any {
    return this.sanitizer.bypassSecurityTrustStyle(this.pInset);
  }
  get percent(): number {
    return this.pPercent;
  }
  get numberAmountSize(): string {
    return `${this.pSize * .20}px`;
  }
  get numberPercentageSize(): string {
    return `${this.pSize * .10}px`;
  }
  get backgroundImageStyle(): string {
    if (this.backgroundImage) {
      return `url(${this.backgroundImage})`;
    }
    return '';
  }
  get transitionTime(): string {
    return this.animate ? '1s' : '0s';
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setInset(0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setInset();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.percentage && !changes.percentage.firstChange) {
      this.pPercent = changes.percentage.currentValue;
      this.setInset();
    }
  }

  private setInset(value?: number): void {
    if (value === undefined) {
      value = this.pPercent;
    }
    this.pInset = `inset(${100 - value}% 0 0 0)`;
  }
}
