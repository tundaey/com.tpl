import { Component, Input, OnInit } from '@angular/core';

import { GooglePieChartService } from './GooglePieChartservice';
import { PieChartConfig } from './PieChartConfig';

declare var google: any;


@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: string;

    constructor(private _pieChartService: GooglePieChartService) {}

    ngOnInit(): void {
        this._pieChartService.BuildPieChart(this.elementId, this.data, this.config); 
    }
}