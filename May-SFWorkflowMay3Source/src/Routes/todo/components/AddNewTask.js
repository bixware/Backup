/**
 * Add New Task Component
 * Used To Add New Task In The Todo List
 */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Form,
   FormGroup,
   Label,
   Input
} from 'reactstrap';

// redux actions
import { addNewTaskAction } from 'Store/Actions';

// intl message
import IntlMessages from 'Util/IntlMessages';

function AddNewTask(props) {
   const [addNewTaskModal, setAddNewTaskModal] = useState(false);
   const [newLabels, setNewLabels] = useState(null);
   const [taskName, setTaskName] = useState('');
   const [assignTo, setAssignTo] = useState(null);
   const todoApp = useSelector(state => state.todoApp);
   const dispatch = useDispatch();
   /**
    * Toggle Add New Task Modal
    */
   const toggleAddNewTaskModal = () => {
      setAddNewTaskModal(!addNewTaskModal);
   }

   /**
    * Handle Add New Task
    */
   const addNewTask = () => {
      let newTaskData;
      let taskAssignTo;
      const { users } = todoApp;
      if (taskName !== '' && assignTo !== null && newLabels !== null) {
         for (const assign of users) {
            if (parseInt(assignTo) === assign.id) {
               taskAssignTo = assign
            }
         }
         let randomId = Math.floor((Math.random() * 1000) + 1);
         newTaskData = {
            id: randomId,
            task_name: taskName,
            assignTo: taskAssignTo,
            labels: newLabels
         }
         setAddNewTaskModal(false);
         dispatch(addNewTaskAction(newTaskData));
      }
   }

   /**
    * On Change Assign To
    */
   const onChangeAssignTo = (e) => {
      setAssignTo(e.target.value)
   }

   /**
    * On Change Labels
    */
   const onChangeLabels = (e) => {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
         if (options[i].selected) {
            value.push(Number(options[i].value));
         }
      }
      setNewLabels(value);
   }
   const { labels, users } = todoApp;
   return (
      <div className="add-task p-20">
         <Button
            onClick={toggleAddNewTaskModal}
            variant="contained"
            className="btn-danger text-white btn-block font-weight-bold"
         >
            <i className="zmdi zmdi-edit mr-10 font-lg"></i>
            <IntlMessages id="components.addNewTasks" />
         </Button>
         <Modal isOpen={addNewTaskModal} toggle={toggleAddNewTaskModal}>
            <ModalHeader toggle={toggleAddNewTaskModal}><IntlMessages id="components.addNewTasks" /></ModalHeader>
            <ModalBody>
               <Form>
                  <FormGroup>
                     <Label for="task-name">Task Name</Label>
                     <Input type="text" name="taskName" id="task-name" placeholder="Enter Task Name" onChange={(e) => setTaskName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                     <Label for="labels">Task Labels</Label>
                     <Input type="select" name="labels" id="task-labels" multiple onChange={onChangeLabels}>
                        {labels.map((label, key) => (
                           <option key={key} value={label.value}>{label.name}</option>
                        ))}
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label for="labels">Assign To</Label>
                     <Input type="select" name="labels" id="task-labels" onChange={onChangeAssignTo} >
                        {users.map((user, key) => (
                           <option key={key} value={user.id}>{user.name}</option>
                        ))}
                     </Input>
                  </FormGroup>
               </Form>
            </ModalBody>
            <ModalFooter>
               <Button variant="contained" className="btn-primary text-white" onClick={addNewTask}><IntlMessages id="button.add" /></Button>{' '}
               <Button variant="contained" className="btn-danger text-white" onClick={toggleAddNewTaskModal}><IntlMessages id="button.cancel" /></Button>
            </ModalFooter>
         </Modal>
      </div>
   );
}


export default AddNewTask;
