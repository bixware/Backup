/**
 * Search Ideas
 */
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { updateSearchIdeas, onSearchIdeas, showFeedbackLoadingIndicator } from 'Store/Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function SearchIdeas(){
   const dispatch = useDispatch();
   const feedback = useSelector(state => state.feedback);

   /**
    * On Search Idea
    */
   const onUpdateSearchIdeas = (e) => {
      dispatch(updateSearchIdeas(e.target.value));
   }

   /**
    * On Search Ideas
    */
   const searchIdeas = () => {
      dispatch(showFeedbackLoadingIndicator());
      const { searchIdeaText } = feedback;
      setTimeout(() => {
         dispatch(onSearchIdeas(searchIdeaText));
      }, 1500);
   }

   const { searchIdeaText } = feedback;
   return (
      <RctCollapsibleCard customClasses="search-filter">
         <form>
            <h2 className="heading"><IntlMessages id="widgets.searchIdeas" /></h2>
            <FormGroup className="mb-0 w-40">
               <Input
                  type="text"
                  name="search"
                  onChange={(e) => onUpdateSearchIdeas(e)}
                  value={searchIdeaText}
               />
            </FormGroup>
            <Button variant="contained" className="btn-primary text-white" onClick={() => searchIdeas()}>Search</Button>
         </form>
      </RctCollapsibleCard>
   );
}

export default SearchIdeas;
