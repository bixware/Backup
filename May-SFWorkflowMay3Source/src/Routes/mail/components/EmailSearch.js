/**
 * Eamil Search
 */
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { searchEmail, updateSearchEmail } from 'Store/Actions';

function EmailSearch(){
   const dispatch = useDispatch();
   const emailApp = useSelector(state => state.emailApp);
    /**
     * On Search Email
     */
   const onSearchEmail = (e) => {
      dispatch(updateSearchEmail(e.target.value));
      dispatch(searchEmail(e.target.value));
   }

   const { searchEmailText } = emailApp;
   return (
      <FormGroup className="mb-0">
         <Input
            type="text"
            name="search"
            id="search-todo"
            placeholder="Search Mail"
            onChange={(e) => onSearchEmail(e)}
            value={searchEmailText}
         />
      </FormGroup>
   );
}

export default EmailSearch;