/**
 * Search Ideas
 */
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { updateSearchIdeas, onSearchIdeas, showFeedbackLoadingIndicator } from 'Store/Actions';

// rct card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function SearchIdeas() {
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
   const onSearchIdea = () => {
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
            <h2 className="heading mb-30">Type Your Question</h2>
            <FormGroup className="mb-0 w-40">
               <Input
                  type="text"
                  name="search"
                  onChange={(e) => onUpdateSearchIdeas(e)}
                  value={searchIdeaText}
               />
            </FormGroup>
            <Button variant="contained" color="primary" className="text-white" onClick={() => onSearchIdea()}>Search</Button>
         </form>
      </RctCollapsibleCard>
   );
}

export default SearchIdeas;
