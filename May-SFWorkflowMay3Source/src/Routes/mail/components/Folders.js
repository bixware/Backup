/**
 * Email Listing Component
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// folders
import Inbox from './Inbox';
import SentEmails from './SentEmails';
import DraftsEmails from './DraftsEmails';
import SpamEmails from './SpamEmails';
import TrashEmails from './TrashEmails';

// components
import EmailListingHeader from './EmailListingHeader';

function Folders(props){
   const emailApp = useSelector(state => state.emailApp);
	
   /**
	 * Get Scroll Height
	 */
   const getScrollHeight = () => {
      const { location } = props;
      const appLayout = getAppLayout(location)
      switch (appLayout) {
         case 'app':
            return 'calc(100vh - 128px)';
         case 'agency':
            return 'calc(100vh - 312px)';
         case 'boxed':
            return 'calc(100vh - 312px)';
         case 'horizontal':
            return 'calc(100vh - 178px)';
         default:
            break;
      }
   }

   const { currentEmail } = emailApp;
   const { match } = props;

   return (
      <div className="list-wrap">
         <Scrollbars
            className="rct-scroll"
            autoHide
            style={{ height: getScrollHeight() }}
         >
            <React.Fragment>
               {currentEmail === null &&
                  <EmailListingHeader />
               }
               <Switch>
                  <Redirect exact from={`${match.url}/`} to={`${match.url}/inbox`} />
                  <Route path={`${match.url}/inbox`} component={Inbox} />
                  <Route path={`${match.url}/sent`} component={SentEmails} />
                  <Route path={`${match.url}/drafts`} component={DraftsEmails} />
                  <Route path={`${match.url}/spam`} component={SpamEmails} />
                  <Route path={`${match.url}/trash`} component={TrashEmails} />
               </Switch>
            </React.Fragment>
         </Scrollbars>
      </div>
   );
}

export default withRouter(Folders);
