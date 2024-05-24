/**
 * Expansion Panel
 */
import React from 'react';

// components
import SimplePanel from './components/SimplePanel';
import ControlledPanel from './components/ControlledPanel';
import AdvancedPanel from './components/AdvancedPanel';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function ControlledExpansionPanels(props){
   // const [expanded, setExpanded] = useState(null);
   
	// const handleChange = panel => (event, expand) => {
   //    setExpanded(expand ? panel : false)
	// };

   return (
      <div className="panel-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.expansionPanel" />} match={props.match} />
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.simpleExpansionPanel" />}
         >
            <SimplePanel />
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.controlledAccordion" />}
         >
            <ControlledPanel />
         </RctCollapsibleCard>
         <RctCollapsibleCard
            heading={<IntlMessages id="widgets.secondaryHeadingAndColumns" />}
         >
            <AdvancedPanel />
         </RctCollapsibleCard>
      </div>
   );
}

export default ControlledExpansionPanels;
