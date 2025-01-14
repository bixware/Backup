/**
 * Cultures Calendar
 */
import React,{ useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

// events
import events from './events';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Localizer = momentLocalizer(moment);

function Cultures(props) {
   const [culture, setCulture] = useState('fr')
   
   let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
   let rtl = culture === 'ar-AE'

   return (
      <div className="calendar-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.cultures" />} match={props.match} />
         <RctCollapsibleCard
            heading="Cultures Calendar"
         >
            <h3 className="callout mb-30">
               <label>Select a Culture</label>{' '}
               <select
                  className="form-control"
                  style={{ width: 200, display: 'inline-block' }}
                  defaultValue={'fr'}
                  onChange={e => setCulture(e.target.value)} >
                  {cultures.map((c, idx) => (
                     <option key={idx} value={c}>
                        {c}
                     </option>
                  ))}
               </select>
            </h3>
            <Calendar
               localizer={Localizer}
               rtl={rtl}
               events={events}
               culture={culture}
               defaultDate={new Date(2015, 3, 12)}
            />
         </RctCollapsibleCard>
      </div>
   )
}

export default Cultures
