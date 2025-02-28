/**
 * Stacked Line Chart
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import ChartConfig from "Constants/chart-config";
import { hexToRgbA } from "Helpers/helpers";

// chart options
const options = {
   plugins:{
      legend: {
         display: true
      }   
   },
   scales: {
      x: {
         display: true,
      },
      y: {
         display: true,
         grid: {
            display: false
         }
      }
   }
};

// Main Component
function StackedLineChart(props){
   const settings = useSelector(state => state.settings);
   const { darkMode } = settings;
   const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      var gradientFill1 = ctx.createLinearGradient(0, 0, 0, 350);
      var gradientFill2 = ctx.createLinearGradient(0, 0, 0, 325);
      gradientFill1.addColorStop(0, hexToRgbA(ChartConfig.color.info, 1));
      gradientFill1.addColorStop(1, darkMode ? "#2c3644" : "#FFFFFF");
      gradientFill2.addColorStop(0, hexToRgbA(ChartConfig.color.primary, 1));
      gradientFill2.addColorStop(1, darkMode ? "#000000" : "#FFFFFF");

      return {
         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
         datasets: [
            {
               label: 'Campaign 1',
               lineTension: 0,
               fill:"start",
               backgroundColor: gradientFill1,
               borderColor: ChartConfig.color.info,
               borderWidth: 3,
               pointBorderWidth: 0,
               pointRadius: 0,
               data: [50, 45, 22, 18, 25, 5, 35, 20, 45, 22, 30, 70, 40]
            },
            {
               label: 'Campaign 2',
               lineTension: 0,
               fill:"start",
               backgroundColor: gradientFill2,
               borderColor: ChartConfig.color.primary,
               borderWidth: 3,
               pointBorderWidth: 0,
               pointRadius: 0,
               data: [40, 30, 60, 30, 35, 50, 10, 30, 25, 28, 55, 65, 80]
            }
         ]
      }
   }
   return (
      <Line data={data} options={options} height={200} />
   );
}

export default StackedLineChart;
