/**
 * project statatics chart
 */
import {useRef} from "react";
import { Line } from "react-chartjs-2";

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// visitor chart data
const options = {
   responsive: true,
   legend: false,
   scales: {
      x: {
         scaleLabel: {
            display: true,
            labelString: 'Time',
            fontSize: 14
         },
         gridLines: {
            display: false,
         },
         ticks: {
            display: true //this will remove only the label
         }
      },
      y: {
         gridLines: {
            drawBorder: false,
         },
         scaleLabel: {
            display: true,
            labelString: 'Cost',
            fontSize: 14
         },
         ticks: {
            padding: 5,
         }
      }
   }
}

function ProjectStatsChart(props){
   const chart = useRef();
   const data = {
      labels: props.labels,
      datasets: [
         {
            label: "Statistics",
            fill: false,
            lineTension: 0.4,
            borderColor: "#5D92F4",
            borderWidth: 3,
            pointBorderColor: "#5D92F4",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#5D92F4",
            pointHoverBorderWidth: 3,
            pointRadius: 6,
            data: props.data
         }
      ]
   }
   return(
      <RctCard>
         <RctCardContent>
            <h3 className="mb-15">Statistics</h3>
            <div className="chart-wrap">
               <Line ref={chart} data={data} options={options} />
            </div>
         </RctCardContent>
      </RctCard>
   );
}

export default ProjectStatsChart