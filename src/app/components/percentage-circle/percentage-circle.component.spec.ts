import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PercentageCircleComponent } from './percentage-circle.component';

describe('PercentCircleComponent', () => {
  let component: PercentageCircleComponent;
  let fixture: ComponentFixture<PercentageCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageCircleComponent);
    component = fixture.componentInstance;
    component.percentage = 25;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('percentage parameter should be between 0 and 100 (test when is greater than 100)', () => {
    component.percentage = 115;
    fixture.detectChanges();
    expect(component.percent).toBe(100);
  });

  it('must show the percentage text', () => {
    component.percentage = 50;
    component.showNumber = true;
    fixture.detectChanges();

    const divValueText = fixture.debugElement.query(By.css('.circle__number'));
    expect(divValueText).toBeTruthy();
  });

  it('must use default color if receives an invalid color', () => {
    component.percentColor = 'notvalid';
    fixture.detectChanges();

    expect(component.percentColor).toBe('#E8E85A');
  });

  it('must use the color if it is valid', () => {
    component.percentColor = 'blue';
    fixture.detectChanges();

    expect(component.percentColor).toBe('blue');
  });
});
