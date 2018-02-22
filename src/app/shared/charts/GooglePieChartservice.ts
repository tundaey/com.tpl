import { GoogleChartsBaseService } from './GoogleCharts';
import { Injectable } from '@angular/core';
import { PieChartConfig } from './PieChartConfig';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig) : void {  

    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    var options = {
            title: config.title,
            pieHole: config.pieHole,
      };

    this.buildChart(data, chartFunc, options);
  }
}