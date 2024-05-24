/**
 * Overall Traffic Stats
 * Stacked Bar CHart Component
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';

// chart config
import ChartConfig from 'Constants/chart-config';

function BarChart(props) {
   const { labels, datasets } = props;
   const data = {
      labels,
      datasets
   }
   const options = {
      plugins:{
         legend: {
            display: false
         }   
      },
      layout: {
      padding: {
         left: 20,
         right: 20,
         top: 20,
         bottom: 20
      }
      },
      scales: {
      x: {
         gridLines: {
            color: ChartConfig.chartGridColor
         },
         ticks: {
            fontColor: ChartConfig.axesColor
         },
         display: true
      },
      y: {
         gridLines: {
            color: ChartConfig.chartGridColor
         },
         ticks: {
            fontColor: ChartConfig.axesColor
         }
      }
      }
   };
   return (
      <Bar data={data} options={options} height={150} />
   );
}

export default BarChart;