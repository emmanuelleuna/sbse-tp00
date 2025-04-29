import { CommonModule } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule
} from "ng-apexcharts";
import { CircularProgressComponent } from "../circular-progress/circular-progress.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;

};

@Component({
  selector: 'app-selected-candidate-card',
  standalone: true,
  imports: [
    NgApexchartsModule,
    CommonModule,
    CircularProgressComponent
  ],
  templateUrl: './selected-candidate-card.component.html',
  styleUrl: './selected-candidate-card.component.css'
})
export class SelectedCandidateCardComponent {
  @Input('isAbstract') isAbstract: boolean = false;
  @Input('isSelected') isSelected: boolean = false;
  @Input('item') item!: any;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Score",
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [
          "Ability to work in different business units",
          "Past experience",
          "Team player",
          "Fluency in a foreign language",
          "Strategic thinking",
          "Oral communication skills",
          "Computer skills",
        ]
      }
    };
  }

  /**
   * Get the percentage of the AHP score
   * @param ahp_score 
   * @returns 
   */
  getAhpPercent(ahp_score: number) {
    let percent = 0
    // 0000FF blue
    percent = (ahp_score * 100) / 50

    return Number.parseFloat(percent.toFixed(1));
  }

  ngOnInit() {
    this.chartOptions.series[0].data = this.item.candidate;
  }
}
