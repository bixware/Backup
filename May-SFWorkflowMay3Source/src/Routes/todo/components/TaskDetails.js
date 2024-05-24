/**
 * Task Details
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// redux action
import {
	backToTodosAction,
	showLoadingIndicatorAction,
	markAsStarTodoAction,
	deleteTodoAction,
	addLabelsIntoTheTaskAction,
	completeTask,
	updateTaskTitle,
	updateTaskDescription,
	changeTaskAssigner,
	fetchTodos
} from 'Store/Actions';

function TaskDetails(props) {
   const dispatch = useDispatch();
   const todoApp = useSelector(state => state.todoApp);   
   const [anchorEl, setAnchorEl] = useState(null);
   const [taskTitleEdit, setTaskTitleEdit] = useState(false);
   const [newTaskTitle, setNewTaskTitle] = useState(todoApp.selectedTodo.task_name);
   const [taskContentEdit, setTaskContentEdit] = useState(false);
   const [newTaskDescription, setNewTaskDescription] = useState(todoApp.selectedTodo.task_description);
   const [userMenu, setUserMenu] = useState(false);
   const [labelMenu, setLabelMenu] = useState(false);

	// back to todos hanlder
	const backToTodos = () => {
		dispatch(showLoadingIndicatorAction());
		setTimeout(() => {
         dispatch(backToTodosAction());
		}, 1500);
	}
	// mark as star todo
	const markAsStarTodo = () => {
      const { selectedTodo } = todoApp;
		dispatch(markAsStarTodoAction(selectedTodo));
	}
	// delete todo
	const deleteTodo = () =>{
      dispatch(deleteTodoAction());
      dispatch(fetchTodos())
	}
	/**
	 * Function to return task label name
	 */
	const getTaskLabelNames = (taskLabels) => {
		let elements = [];
      const { labels } = todoApp;
		for (const taskLabel of taskLabels) {
			for (const label of labels) {
				if (label.value === taskLabel) {
					let ele = <span key={label.value}
						className={classNames('badge mr-10 mb-5', { 'badge-success': label.value === 1, 'badge-primary': label.value === 2, 'badge-info': label.value === 3, 'badge-danger': label.value === 4 })}
					>
						<IntlMessages id={label.name} />
					</span>;
					elements.push(ele);
				}
			}
		}
		return elements;
	}
	const handleClick = event => {
      setLabelMenu(true);
      setAnchorEl(event.currentTarget);
	}
	const handleClose = () => {
      setAnchorEl(null);
      setLabelMenu(false);
	}
	/**
	 * Function to edit the task title
	 */
	const editTaskTitle = () => {
      setTaskTitleEdit(true);
	}
	/**
	* Function to add labels in the task
	*/
	const addLabelsIntoTheTask = (label) => {
      setAnchorEl(null);
		dispatch(addLabelsIntoTheTaskAction(label));
	}
	/**
	 * Function to complete task
	 */
	const onCompleteTask = () => {
		dispatch(completeTask());
	}
	/**
	 * Submit new task title
	 */
	const submitNewTaskTitle = () => {
      setTaskTitleEdit(false);
      dispatch(updateTaskTitle(newTaskTitle));
	}
	/**
	 * Function to edit the task content
	 */
	const editTaskDescription = () => {
      setTaskContentEdit(true);
	}
	/**
	 * Function to submit new task description
	 */
	const submitNewTaskDescription = () => {
      setTaskContentEdit(false);
      dispatch(updateTaskDescription(newTaskDescription));
   }
   
	const handleUserClick = event => {
      setUserMenu(true);
      setAnchorEl(event.currentTarget);
   };
   
	const handleRequestClose = () => {
      setUserMenu(false);
	};
	/**
	 * Function to change task asssigner
	 */
	const onChangeTaskAssigner = (user) => {
      setUserMenu(false);
      dispatch(changeTaskAssigner(user));
	}
   const { loading, selectedTodo, labels, users } = todoApp;
   return (
      <div className="list-wrap">
         {loading ? <RctSectionLoader />
            : <div className="task-detail-wrapper">
               <div className="top-head">
                  <IconButton aria-label="back arrow" onClick={() => backToTodos()}>
                     <i className="zmdi zmdi-arrow-back"></i>
                  </IconButton>
               </div>
               <Scrollbars className="rct-scroll" autoHide style={{ height: "calc(100vh - 197px)" }}>
                  <div className="task-detail">
                     <div className="d-flex justify-content-between task-detail-top py-3 px-4 border-bottom">
                        <div className="media align-items-center" onClick={handleUserClick}>
                           <img src={selectedTodo.assignTo.photo_url} alt="select user" className="img-fluid rounded-circle mr-15" width="50" height="50" />
                           <div className="media-body">
                              <h5 className="mb-0">{selectedTodo.assignTo.name}</h5>
                           </div>
                        </div>
                        <Menu
                           id="label-menu"
                           anchorEl={anchorEl}
                           open={userMenu}
                           onClose={handleRequestClose}
                           MenuListProps={{
                              style: {
                                 width: 180,
                              },
                           }}>
                           {users.map((user, index) =>
                              <MenuItem key={index} value={user.id} onClick={() => {
                                 onChangeTaskAssigner(user);
                              }}>
                                 <div className="d-flex user-name manage-margin align-items-center">
                                    <Avatar src={user.photo_url} alt={user.name} /><h4>{user.name}</h4>
                                 </div>
                              </MenuItem>
                           )}
                        </Menu>
                        <div className="task-action d-flex align-items-center">
                           <ul className="list-unstyled mb-0 d-flex">
                              <li>
                                 <IconButton aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={handleClick}>
                                    <i className="zmdi zmdi-label-alt"></i>
                                 </IconButton>
                                 <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={labelMenu}
                                    onClose={handleClose}
                                    MenuListProps={{
                                       style: {
                                          width: 150
                                       }
                                    }}
                                 >
                                    {labels.map((label) => (
                                       <MenuItem onClick={() => addLabelsIntoTheTask(label)} key={label.value}>
                                          <IntlMessages id={label.name} />
                                       </MenuItem>
                                    ))}
                                 </Menu>
                              </li>
                              <li>
                                 <IconButton onClick={() => markAsStarTodo()}>
                                    <i className={classNames('zmdi', { ' zmdi-star-outline': !selectedTodo.starred, 'zmdi-star': selectedTodo.starred })}></i>
                                 </IconButton>
                              </li>
                              <li>
                                 <IconButton onClick={() => deleteTodo()}><i className="zmdi zmdi-delete"></i></IconButton>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="task-detail-content px-50 py-3 border-bottom">
                        <div className="task-labels mb-3">
                           {getTaskLabelNames(selectedTodo.labels)}
                        </div>
                        <div className="task-content">
                           <div className="mb-25 task-box bg-aqua">
                              <IconButton aria-label="check" onClick={() => onCompleteTask()}>
                                 <i className={classNames('zmdi zmdi-check-all', { 'text-info': selectedTodo.completed })}></i>
                              </IconButton>
                              {taskTitleEdit ?
                                 <span>
                                    <TextField
                                       id="title"
                                       fullWidth
                                       type="text"
                                       value={newTaskTitle}
                                       onChange={(e) => setNewTaskTitle(e.target.value)}
                                    />
                                    <IconButton aria-label="check" className="task-btn" onClick={() => submitNewTaskTitle()}>
                                       <i className="zmdi zmdi-check"></i>
                                    </IconButton>
                                 </span>
                                 : <span>
                                    <span>{selectedTodo.task_name}</span>
                                    <IconButton aria-label="check" className="task-btn" onClick={() => editTaskTitle()}>
                                       <i className="zmdi zmdi-edit"></i>
                                    </IconButton>
                                 </span>
                              }
                           </div>
                           <div className="task-box bg-aqua mb-3">
                              {taskContentEdit ?
                                 <div>
                                    <TextField
                                       id="task-description"
                                       fullWidth
                                       type="text"
                                       value={newTaskDescription}
                                       onChange={(e) => setNewTaskDescription(e.target.value)}
                                    />
                                    <IconButton aria-label="check" className="task-btn" onClick={() => submitNewTaskDescription()}>
                                       <i className="zmdi zmdi-check"></i>
                                    </IconButton>
                                 </div>
                                 : <div>
                                    <span className="small-text">{selectedTodo.task_description}</span>
                                    <IconButton aria-label="check" className="task-btn" onClick={() => editTaskDescription()}>
                                       <i className="zmdi zmdi-edit"></i>
                                    </IconButton>
                                 </div>
                              }
                           </div>
                        </div>
                     </div>
                     <div className="task-comment px-30 py-3">
                        <h3 className="mb-20">Comments</h3>
                        <ul className="list-unstyled">
                           <li className="media">
                              <img src={`${process.env.PUBLIC_URL}/assets/images/img/user-2.jpg`} className="img-fluid rounded-circle mr-15" alt="user profile" width="50" height="50" />
                              <div className="media-body pt-5">
                                 <h6 className="mb-0">Jhon Smith <span className="fs-14">Jan 9, 2017, 3:03:28 PM</span></h6>
                                 <span className="text-muted font-xs">Asperger S Syndrome Is There Real Cure For It</span>
                              </div>
                           </li>
                           <li className="media">
                              <img src={`${process.env.PUBLIC_URL}/assets/images/img/user-3.jpg`} className="img-fluid rounded-circle mr-15" alt="user profile" width="50" height="50" />
                              <div className="media-body pt-5">
                                 <h6 className="mb-0">Rukshana Smith <span className="fs-14">Jan 9, 2017, 3:03:28 PM</span></h6>
                                 <span className="text-muted font-xs">Asperger S Syndrome Is There Real Cure For It</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className="task-foot d-flex align-items-center p-20">
                     <Input type="textarea" name="text" placeholder="Send Message" id="exampleText" className="mr-3" />
                     <Button variant="contained" color="primary" className="bg-primary">
                        Send
                     <i className="zmdi zmdi-mail-send ml-2"></i>
                     </Button>
                  </div>
               </Scrollbars>
            </div>
         }
      </div>
   );
}


export default TaskDetails;
