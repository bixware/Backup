/**
 * Line chart widget
 */
import React,{useRef} from "react";
import { Line } from "react-chartjs-2";

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

function LineChart (props) {
   const chart = useRef()
   const { data, options, bgColor, icon, title, total, trade } = props.data;
   return (
      <div className={`bg-color ${bgColor}`}>
         <RctCard >
            <RctCardContent>
               <div>
                  <div className="chart-title d-flex justify-content-start align-items-center">
                     <span className="material-icons mr-10">{icon}</span>
                     <span className="fw-normal text-capitalize">{title}</span>
                  </div>
                  <div className="chart-wrap">
                     <Line ref={chart} data={data} options={options} height={100} />
                  </div>
                  <div className="chart-content d-flex justify-content-between align-items-center">
                     <span>+{total}</span>
                     <span className="text-capitalize">trade:{trade}%</span>
                  </div>
               </div>
            </RctCardContent>
         </RctCard>
      </div>
   );
}

export default LineChart
