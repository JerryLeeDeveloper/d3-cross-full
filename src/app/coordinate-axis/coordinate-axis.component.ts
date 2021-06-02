import { Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';

import * as d3 from 'd3';
import { isSafeInteger, isSafeFloat } from '../shared/type.util';

@Component({
  selector: 'app-coordinate-axis',
  templateUrl: './coordinate-axis.component.html',
  styleUrls: ['./coordinate-axis.component.css']
})
export class CoordinateAxisComponent implements OnChanges, OnInit {

  private svg: any;
  private dataSet: any;
  private line: any;
  private axisWidth: number;
  private xAxisCen: number;
  private yAxisCen: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private xAxisG: any;
  private yAxisG: any;
  private rangeX: number;
  private rangeY: number;
  private xAxisCall: any;
  private yAxisCall: any;

@Input() dataA: string;
@Input() dataB: string;
@Input() dataC: string;
@Input() valid: boolean;

  constructor() { }

  ngOnInit() {
    this.axisWidth = 500;
    this.xAxisCen = 300;
    this.yAxisCen = 300;
    this.initSvg();
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.xAxisCall = d3.axisBottom;
    this.yAxisCall = d3.axisLeft;
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    let notFstChg = false;
    let vaildChange = false;

    for (const propName of Object.keys(changes)) {
      const changedProp = changes[propName];
      const isNotFirstChange = !changedProp.isFirstChange();
      notFstChg = notFstChg || isNotFirstChange;
      if (isNotFirstChange && propName === 'valid') {
        vaildChange = changedProp.previousValue !== changedProp.currentValue;
      }
    }

    if (notFstChg && this.valid) { // not first change and valid is true
      this.drawChart();
    } else if (vaildChange && !this.valid) { // not first change, vaild is changed and it is not true
      this.removeLine();
    }
  }

  setRange(x, y) {
    this.rangeX = x;
    this.rangeY = y;
  }

  createPoints(a: number, b: number, c: number, rangeX: any, step: number) { // ax^2+bx+c
    let newMaxY = 10;
    const arr = Array.apply(
      null,
      Array((rangeX[1] - rangeX[0]) / step + 1)
    ).map((d: number , i) => {
      const x = rangeX[0] + i * step;
      const y = a * x * x + b * x + c;
      newMaxY = Math.max(newMaxY, Math.abs(y));
      return {x, y};
    });
    this.setRange(rangeX, [newMaxY, -newMaxY]);
    return arr;
  }

  updateDataSet(empty= false) {
    if (empty) {
      this.dataSet = [];
      return;
    }
    // create points
    this.dataSet = this.createPoints(
      isSafeInteger(this.dataA) || isSafeFloat(this.dataA) ? Number(this.dataA) : 0,
      isSafeInteger(this.dataB) || isSafeFloat(this.dataB) ? Number(this.dataB) : 0,
      isSafeInteger(this.dataC) || isSafeFloat(this.dataC) ? Number(this.dataC) : 0,
      [-10, 10],
      1
    );
  }

  initSvg() {
    this.svg = d3.select('#chart').append('svg')
      .attr('width', 600)
      .attr('height', 600);
  }

  setScale() {
    this.xScale.domain(this.rangeX).range([0, this.axisWidth]);
    this.yScale.domain(this.rangeY).range([0, this.axisWidth]);
    this.xAxis = this.xAxisCall(this.xScale);
    this.yAxis = this.yAxisCall(this.yScale);
  }

  // ** Update axis example2: redraw with same function **
  fillAxis() {
    const x = this.xAxisCen - this.axisWidth / 2;
    const y = this.xAxisCen;

    this.xAxisG = this.svg
      .selectAll('.x')
      .data(['dummy']);

    this.yAxisG = this.svg
      .selectAll('.y')
      .data(['dummy']);

    const nX = this.xAxisG
      .enter()
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + x + ',' + y + ')')
      .call(this.xAxis);

    const nY = this.yAxisG
      .enter()
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + y + ',' + x + ')')
      .call(this.yAxis);

    this.xAxisG.merge(nX).call(this.xAxis);
    this.yAxisG.merge(nY).call(this.yAxis);
  }

  drawAxis() {
    this.setScale();
    this.fillAxis();
  }

  // ** Update axis example1: nead redraw function **
  // fillAxis() {
  //   const x = this.xAxisCen - this.axisWidth / 2;
  //   const y = this.xAxisCen;
  //
  //   this.xAxisG = this.svg
  //     .append('g')
  //     .attr('class', 'x axis')
  //     .attr('transform', 'translate(' + x + ',' + y + ')')
  //     .call(this.xAxis);

  //   this.yAxisG = this.svg
  //     .append('g')
  //     .attr('class', 'y axis')
  //     .attr('transform', 'translate(' + y + ',' + x + ')')
  //     .call(this.yAxis);
  // }

  // redrawAxis() {
  //   this.setScale();
  //   this.xAxisG = this.svg.select('.x').call(this.xAxis);
  //   this.yAxisG = this.svg.select('.y').call(this.yAxis);
  // }

  setLine() { // set point position by data
    this.line = d3
      .line()
      .x((d: any) => {
        return ((d.x * this.axisWidth) / 2 / this.rangeX[1]) + this.xAxisCen;
      })
      .y((d: any) => {
        return ((-1 * d.y * this.axisWidth) / 2 / this.rangeY[0]) + this.yAxisCen;
      });
  }

  fillLine(target: any) { // set style of line
    target
      .attr('d', this.line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '2px')
      .attr('class', 'line');
  }

  drawLine() { // redraw line by data
    const updateLine = this.svg.selectAll('.line').data([this.dataSet]);
    const enterLine = updateLine.enter();
    const exitLine = updateLine.exit();

    this.setLine();
    this.fillLine(updateLine);
    this.fillLine(enterLine.append('path'));
    exitLine.remove();
  }

  drawChart() {
    this.updateDataSet();
    this.drawAxis();
    this.drawLine();
  }

  removeLine() {
    this.updateDataSet(true);
    this.drawLine();
  }
}
