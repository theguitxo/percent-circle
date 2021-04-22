import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  size: number;
  sliderSize: number;
  value: number;
  sliderValue: number;
  showNumber = true;
  animate = false;
  percentColor = '#E8E85A';
  percentTextColor = '#000000';
  backgroundColor = '#EEEEEE';
  backgroundImage = false;
  backgroundFilter = false;

  constructor() {}

  get backgroundImageFile(): string {
    return this.backgroundImage ? './assets/example.jpg' : '';
  }

  ngOnInit(): void {
    this.size = this.sliderSize = 200;
    this.value = this.sliderValue = 50;
  }

  updateValue(): void {
    this.value = this.sliderValue;
  }

  updateSize(): void {
    this.size = this.sliderSize;
  }

  updateBgImageOptions(): void {
    if (!this.backgroundImage) {
      this.backgroundFilter = false;
    }
  }
}
