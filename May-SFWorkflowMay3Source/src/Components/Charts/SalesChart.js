/**
 * Sales Chart Component
 */
import React from 'react';
import { Line } from 'react-chartjs-2';

// chart config file
import ChartConfig from 'Constants/chart-config';

// Main Component
function SalesChart(props){
   const { labels, label, borderColor, chartdata, pointBackgroundColor, height, pointBorderColor, borderWidth } = props;
   const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const _stroke = ctx.stroke;
      ctx.stroke = function () {
         ctx.save();
         ctx.shadowColor = ChartConfig.shadowColor;
         ctx.shadowBlur = 13;
         ctx.shadowOffsetX = 0;
         ctx.shadowOffsetY = 12;
         _stroke.apply(this, arguments);
         ctx.restore();
      };
      return {
         labels: labels,
         datasets: [
            {
               label: label,
               fill: false,
               lineTension: 0,
               fillOpacity: 0.3,
               borderColor: borderColor,
               borderWidth: borderWidth,
               pointBorderColor: pointBorderColor,
               pointBackgroundColor: pointBackgroundColor,
               pointBorderWidth: 3,
               pointRadius: 6,
               pointHoverBackgroundColor: pointBackgroundColor,
               pointHoverBorderColor: pointBorderColor,
               pointHoverBorderWidth: 4,
               pointHoverRadius: 7,
               data: chartdata,
            }
         ]
      }
   }
   // chart options
   const options = {
      plugins:{
         legend: {
            display: false
         }   
      },
      scales: {
            x: {
               display: true,
               ticks: {
                  min: 0
               },
               gridLines: {
                  display: true,
                  drawBorder: false
               }
            },
            y: {
               display: false,
               ticks: {
                  suggestedMin: 0,
                  beginAtZero: true
               }
            }
      }
   };
   return (
      <Line data={data} options={options} height={height} />
   );
}

export default SalesChart;