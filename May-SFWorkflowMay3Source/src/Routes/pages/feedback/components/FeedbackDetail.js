/**
 * Feedback Details
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';

// actions
import { showFeedbackLoadingIndicator, navigateToBack, onCommentAction } from 'Store/Actions';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

function FeedbackDetails(props){
   const [comment, setComment] = useState('');
   const dispatch = useDispatch();
   const feedback = useSelector(state => state.feedback);
   /**
    * Navigate To Back
    */
   const onNavigateToBack = () => {
      dispatch(showFeedbackLoadingIndicator());
      setTimeout(() => {
         dispatch(navigateToBack());
      }, 1500);
   }

   /**
    * On Comment
    */
   const onComment = () => {
      if (comment !== '') {
         let data = {
            id: new Date().getTime(),
            userName: 'Admin',
            avatar: '',
            comment,
            reply: null
         }
         dispatch(onCommentAction(data));
         setComment('');
      }
   }

   const { loading } = props;
   const { selectedFeedback } = feedback
   return (
      <RctCollapsibleCard>
         <div className="rct-block-title">
            <Button onClick={() => onNavigateToBack()}>
               <i className="zmdi zmdi-arrow-left mr-10" ></i> All Ideas
         </Button>
         </div>
         <div className="row">
            <div className="col-md-12 col-lg-9">
               <div className="d-flex justify-content-start">
                  <div className="like-box">
                     <h2>30</h2>
                     <span className="mr-5">Likes</span>
                     <i className="zmdi zmdi-thumb-up"></i>
                  </div>
                  <div>
                     <div className="mb-30">
                        <h2 className="title">{selectedFeedback.idea}</h2>
                        <p>{selectedFeedback.description}</p>
                     </div>
                     {selectedFeedback.comments.length > 0 ?
                        <h2 className="heading">Comment ({selectedFeedback.comments.length})</h2>
                        : <h2 className="heading">No Comments Found</h2>
                     }
                     <ul className="list-unstyled w-75 comment-sec">
                        {selectedFeedback.comments.length > 0 && selectedFeedback.comments.map((comment, key) => (
                           <li className="media" key={key}>
                              {comment.avatar !== '' ?
                                 <img src={comment.avatar} alt="user profile" className="img-fluid rounded-circle mr-20" width="50" height="50" />
                                 : <Avatar className="mr-20">{comment.userName.charAt(0)}</Avatar>
                              }
                              <div className="media-body">
                                 <p className="comment-box">{comment.comment}</p>
                                 {comment.reply !== null && comment.reply.map((reply, subkey) => (
                                    <div className="media mt-30 mb-0" key={subkey}>
                                       {reply.avatar !== '' ?
                                          <img src={reply.avatar} alt="user profile" className="img-fluid rounded-circle mr-20" width="50" height="50" />
                                          : <Avatar className="mr-20">{reply.userName.charAt(0)}</Avatar>
                                       }
                                       <div className="media-body">
                                          <p className="comment-box">{reply.comment}</p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </li>
                        ))}
                     </ul>
                     <Form className="ml-70 w-75">
                        <FormGroup>
                           <Input type="textarea" rows="7" name="text" id="Text" placeholder="Type Your comment..." onChange={(e) => setComment(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                           <Button variant="contained" className="btn-primary text-white btn-lg" onClick={() => onComment()}>Comment</Button>
                        </FormGroup>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
         {loading &&
            <RctSectionLoader />
         }
      </RctCollapsibleCard>
   );
}

export default FeedbackDetails;
