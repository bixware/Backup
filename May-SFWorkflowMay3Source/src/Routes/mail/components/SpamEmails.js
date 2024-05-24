/**
 * Spam Emails
 */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';

// components
import EmailListing from '../components/EmailListing';
import EmailDetail from '../components/EmailDetail';

// redux actions
import { getSpamEmails } from 'Store/Actions';

function SpamEmails(props) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSpamEmails());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  	
   const { match } = props;
   return (
      <Switch>
         <Route exact path={match.url} component={EmailListing} />
         <Route path={`${match.url}/:id`} component={EmailDetail} />
      </Switch>
   );
}

export default withRouter(SpamEmails);
