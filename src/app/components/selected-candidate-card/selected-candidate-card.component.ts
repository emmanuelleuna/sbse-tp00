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
    NgApexchartsModule
  ],
  templateUrl: './selected-candidate-card.component.html',
  styleUrl: './selected-candidate-card.component.css'
})
export class SelectedCandidateCardComponent {
  @Input('isAbstract') isAbstract: boolean = false;
  @Input('isSelected') isSelected: boolean = false;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Score",
          data: [19, 9, 10, 50, 33, 23, 43]
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
}
