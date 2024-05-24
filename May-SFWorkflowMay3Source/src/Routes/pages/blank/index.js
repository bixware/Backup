/**
 * Blank Page
 */
import React from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default function Blank(props) {	
   return (
      <div className="blank-wrapper">
         <Helmet>
            <title>Blank Page</title>
            <meta name="description" content="Reactify Blank Page" />
         </Helmet>
         <PageTitleBar title={<IntlMessages id="sidebar.blank" />} match={props.match} />
      </div>
   );
}
