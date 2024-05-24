/**
 * Feedbacks Listings
 */
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// actions
import {
    onFeedbackFavorite,
    onDeleteFeedback,
    viewFeedbackDetails,
    showFeedbackLoadingIndicator,
    replyFeedback,
    sendReply
} from 'Store/Actions';

// components
import FeedbacksListItem from './FeedbacksListItem';

function FeedbacksListing(){
   const deleteConfirmation = useRef();
   const [deleteFeedback, setDeleteFeedback] = useState(null);
   const dispatch = useDispatch();
   const feedback = useSelector(state => state.feedback);
    /**
     * On Feedback Favorite
     */
   const feedbackFavorite = (feedback) => {
      dispatch(onFeedbackFavorite(feedback));
   }

    /**
     * On Delete Feedback
     */
   const deleteFeedbackMethod = (feedback) => {
      deleteConfirmation.current.open();
      setDeleteFeedback(feedback);
   }

    /**
     * Delete Feedback After Alert
     */
   const feedbackDelete = () => {
      deleteConfirmation.current.close();
      dispatch(showFeedbackLoadingIndicator());      
      setTimeout(() => {
         dispatch(onDeleteFeedback(deleteFeedback));
      }, 1500);
   }

    /**
     * View Feedback Details
     */
   const onViewFeedbackDetails = (feedback) => {
      dispatch(showFeedbackLoadingIndicator()); 
      setTimeout(() => {
         dispatch(viewFeedbackDetails(feedback));
      }, 1500);
   }

    /**
     * Reply Feedback
     */
   const onReplyFeedback = (feedback) => {
      dispatch(replyFeedback(feedback));
   }

    /**
     * Send Reply
     */
   const onReplySend = (feedback) => {
      dispatch(showFeedbackLoadingIndicator());
      setTimeout(() => {
         dispatch(sendReply(feedback));
      }, 1500);
   }

   const { feedbacks } = feedback;
   return (
      <div>
            <ul className="list-unstyled mb-0">
               {feedbacks && feedbacks.map((feedback, key) => (
                  <FeedbacksListItem
                     data={feedback}
                     key={key}
                     onFeedbackFavorite={() => feedbackFavorite(feedback)}
                     onDeleteFeedback={() => deleteFeedbackMethod(feedback)}
                     viewFeedbackDetails={() => onViewFeedbackDetails(feedback)}
                     onReply={() => onReplyFeedback(feedback)}
                     onReplySend={() => onReplySend(feedback)}
                  />
               ))}
            </ul>
            <DeleteConfirmationDialog
               ref={deleteConfirmation}
               title="Are you sure want to delete?"
               message="This will delete permanently your feedback from feedback list."
            onConfirm={() => feedbackDelete()}
            />
      </div>
   );
}

export default FeedbacksListing;
