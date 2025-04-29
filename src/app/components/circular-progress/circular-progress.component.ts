import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css'
})
export class CircularProgressComponent {
  @Input() value: number = 0;
  @Input() color: string = '#4caf50';
  @Input() size: number = 120; // Taille du SVG (en pixels)

  radius: number = 0;
  center: number = 0;
  circumference: number = 0;
  strokeDashoffset: number = 0;

  ngOnInit() {
    this.center = this.size / 2;
    this.radius = this.center - 10; // 10 = stroke-width
    this.circumference = 2 * Math.PI * this.radius;
    this.strokeDashoffset = this.circumference * (1 - this.value / 100);
  }
}
