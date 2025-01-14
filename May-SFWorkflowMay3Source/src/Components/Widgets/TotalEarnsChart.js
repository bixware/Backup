/**
 * Total Earns Chart Widget
 */
import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, ButtonGroup } from 'reactstrap';

// chart config
import ChartConfig from 'Constants/chart-config';
import { hexToRgbA } from 'Helpers/helpers';

// chart options
const options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  plugins:{
    legend:{
      display: false
    }
  },
  maintainAspectRatio: true,
  scales: {
    y: {
      ticks: {
        fontColor: hexToRgbA(ChartConfig.color.dark, 0.4),
        fontStyle: "light",
        beginAtZero: true,
        maxTicksLimit: 5,
        padding: 10,
        display:false
      },
      grid: {
        drawTicks: true,
        drawBorder: false,
        display: false,
        color: hexToRgbA(ChartConfig.color.dark, 0.1),
        zeroLineColor: "transparent"
      }
    },
    x: {
      grid: {
        display: false,
        color: hexToRgbA(ChartConfig.color.dark, 0.1),
      },
      ticks: {
        padding: 20,
        fontColor: hexToRgbA(ChartConfig.color.dark, 0.4),
        fontStyle: "light",
        display:false
      }
    }
  }
}

function TotalEarnsChart(props) {

   const { data } = props;
    // chart data
   const dashboardPanelChart = {
      data: (canvas) => {
        const ctx = canvas.getContext("2d");
        var chartColor = hexToRgbA(ChartConfig.color.primary, 1);
        var gradientFill = ctx.createLinearGradient(0, 230, 0, 60);
        gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradientFill.addColorStop(1, hexToRgbA(ChartConfig.color.primary, 0.8));

        return {
          labels: data.chartData.labels,
          datasets: [
            {
              label: data.chartData.label,
              borderColor: chartColor,
              pointBorderColor: hexToRgbA(ChartConfig.color.white, 1),
              pointBackgroundColor: hexToRgbA(ChartConfig.color.primary, 1),
              pointHoverBackgroundColor: hexToRgbA(ChartConfig.color.primary, 1),
              pointHoverBorderColor: hexToRgbA(ChartConfig.color.white, 1),
              pointBorderWidth: 2,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 2,
              lineTension:0.4,
              pointRadius: 7,
              fill: true,
              backgroundColor: gradientFill,
              borderWidth: 2,
              data: data.chartData.data
            }
          ]
        }
      }
   };
   return (
      <Fragment>
        <div className="chart-top d-flex justify-content-between display-n p-20">
          <div className="d-flex align-items-start">
            <ButtonGroup className="default-btn-group">
              <Button className="btn-sm">Week</Button>
              <Button className="btn-sm active">Month</Button>
              <Button className="btn-sm">Year</Button>
              <Button className="btn-sm">Today</Button>
            </ButtonGroup>
          </div>
          <div className="d-flex align-items-end">
            <span className={`${data.legend.class} badge-sm`}>&nbsp;</span><span className="fs-12">{data.legend.name}</span>
          </div>
        </div>
        <Line data={dashboardPanelChart.data} options={options} height={100} />
      </Fragment>
   );
}

export default TotalEarnsChart;
