/**
 * Add New Feedback
 */
import React, { useState } from 'react';
import { Input, Form, Label, Col, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

// redux actions
import { addNewFeedback, showFeedbackLoadingIndicator } from 'Store/Actions';

function AddNewFeedback (){
   const [newIdea, setNewIdea] = useState('');
   const [description, setDescription] = useState('');
   const dispatch = useDispatch();
    /**
     * Add New Feedback
     */
   const newFeedback = () => {
      let currentTime = new Date();
      if (newIdea !== '' && description !== '') {
         let data = {
            id: currentTime.getTime(),
            idea: newIdea,
            description,
            userAvatar: `${process.env.PUBLIC_URL}/assets/images/img/user-7.jpg`,
            userName: 'Admin',
            time: 'Just Now',
            planned: false,
            inProgress: false,
            liked: false,
            deleted: false,
            comments: []
         }
         setNewIdea('');
         setDescription('');
         dispatch(showFeedbackLoadingIndicator());
         setTimeout(() => {
            dispatch(addNewFeedback(data));
         }, 1500);
      }
   }

   return (
      <div className="row">
         <div className="col-sm-12 col-md-10 col-lg-7">
            <h2 className="heading mb-40">We had love your feedback on how to improve our web app.</h2>
            <Form>
               <FormGroup row>
                  <Label for="idea" sm={3}>Idea</Label>
                  <Col sm={9}>
                     <Input type="text" name="idea" id="idea" className="input-lg" onChange={(e) => setNewIdea(e.target.value)} />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for="description" sm={3}>Description</Label>
                  <Col sm={9}>
                     <Input type="textarea" rows="7" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label sm={3}>&nbsp;</Label>
                  <Col sm={9}>
                     <Button variant="contained" className="btn-primary text-white" onClick={() => newFeedback()}>Save</Button>
                  </Col>
               </FormGroup>
            </Form>
         </div>
      </div>
   );
}

export default AddNewFeedback;
