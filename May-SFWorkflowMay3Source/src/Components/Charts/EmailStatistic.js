/**
 * Email Statistics Bar Chart
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';

const options = {
  plugins:{
    legend: {
      display: false,
      labels: {
        fontColor: ChartConfig.legendFontColor
      }
    }
  },  
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color:'rgba(255, 255, 255, 0.75)',
        fontSize: 14,
        beginAtZero: true
      }
    },
    y: {
      grid: {
        drawBorder: false,
        zeroLineColor: ChartConfig.axesColor,
        color: ChartConfig.axesColor
      },
      ticks: {
        color:'rgba(255, 255, 255, 0.75)',
        stepSize: 10,
        display: false,
        beginAtZero: true
      }
    }
  }
};

const EmailStatistic = ({ datasets, labels }) => {
  const data = {
    labels,
    datasets
  }
  return (
    <Bar height={240} data={data} options={options} />
  );
}

export default EmailStatistic;
