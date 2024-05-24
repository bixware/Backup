/**
 * Email Listing
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
// redux action
import { readEmail, onSelectEmail, markAsStarEmail } from 'Store/Actions';
// component
import EmailListItem from './EmailListItem';
//Intl Message
import IntlMessages from 'Util/IntlMessages';

function EmailListing(props){
   const dispatch = useDispatch();
   const emailApp = useSelector(state => state.emailApp);
   const { labels, emails } = emailApp;

   /**
    * Read Email
    */
   const onReadEmail = (email) => {
      const { match, history } = props;
      dispatch(readEmail(email));
      history.push(`${match.url}/${email.id}`);
   }

    /**
     * On Select Email
     */
   const selectEmail = (e, email) => {
      e.stopPropagation();
      dispatch(onSelectEmail(email))                                                                 ;
   }

    /**
     * Handle Mark As Star Email
     */
   const handleMarkAsStar =(e, email) => {
      e.stopPropagation();
      dispatch(markAsStarEmail(email));
   }

    /**
     * Function to return task label name
     */
   const getTaskLabelNames = (taskLabels) => {
      let elements = [];
      for (const taskLabel of taskLabels) {
         for (const label of labels) {
            if (label.value === taskLabel) {
               let ele = <span key={label.value}
                  className={classnames('badge badge-pill', { 'badge-success': label.value === 1, 'badge-primary': label.value === 2, 'badge-info': label.value === 3, 'badge-danger': label.value === 4 })}
               >
                  <IntlMessages id={label.name} />
               </span>;
               elements.push(ele);
            }
         }
      }
      return elements;
   }

   return (
      <ul className="list-unstyled m-0">
         {(emails && emails.length > 0 && emails !== null) ? emails.map((email, key) => (
            <EmailListItem
               email={email}
               handleMarkAsStar={(e) => handleMarkAsStar(e, email)}
               key={key}
               onSelectEmail={(e) => selectEmail(e, email)}
               onReadEmail={() => onReadEmail(email)}
               getTaskLabelNames={() => getTaskLabelNames(email.email_labels)}
            />
         ))
            :
            <div className="d-flex justify-content-center align-items-center py-50">
               <h4>No Emails Found In Selected Folder</h4>
            </div>
         }
      </ul>
   );
}

export default withRouter(EmailListing);
