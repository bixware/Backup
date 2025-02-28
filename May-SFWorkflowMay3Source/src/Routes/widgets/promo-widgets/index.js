/**
 * Promo Widgets Page
 */
import React from 'react';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// widgets
import {
	ShareFriends,
	PromoCoupons,
	Rating
} from "Components/Widgets";

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default function UserWidgets(props) {
   return (
      <div className="promo-widgets-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.promo" />} match={props.match} />
         <div className="row row-eq-height">
            <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
               <ShareFriends />
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
               <PromoCoupons />
            </div>
         </div>
         <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
               <Rating />
            </div>
         </div>
      </div>
   );
}
