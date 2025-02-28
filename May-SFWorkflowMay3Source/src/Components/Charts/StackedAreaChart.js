/**
 * Stacked Area Chart
 */
import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';

const options = {
   plugins:{
      legend: {
         display: false,
         labels: {
            fontColor: ChartConfig.legendFontColor,
            usePointStyle: true
         }
      }   
   },
   scales: {
      x: {
         gridLines: {
            color: ChartConfig.chartGridColor,
            display: false
         },
         ticks: {
            fontColor: ChartConfig.axesColor
         }
      },
      y: {
         gridLines: {
            color: ChartConfig.chartGridColor
         },
         ticks: {
            fontColor: ChartConfig.axesColor,
            min: 100,
            max: 800
         }
      }
   }
};

// Main Component
function StackedAreaChartComponent(props) {
   const { labels, datasets } = props;
   const data = {
      labels,
      datasets
   };
   return (
      <Line data={data} options={options} height={60} />
   );
}

export default StackedAreaChartComponent;