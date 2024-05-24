/**
 * Task Listing Component
 * Used To Display Task List
 */
import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';

// components
import TodoListItem from './TodoListItem';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// redux action
import {
	onSelectTodoAction,
	hideLoadingIndicatorAction,
	fetchTodos,
	onCheckBoxToggleTodoItem,
	selectAllTodo,
	getUnselectedAllTodo,
	selectStarredTodo,
	selectUnStarredTodo,
	onLabelSelect,
	onLabelMenuItemSelect
} from 'Store/Actions';

// options
import options from 'Assets/data/todo-app/options';

const SortableList = ({ toDos, onSelectTodo, onCheckBoxClickTodoItem, getTaskLabelNames }) => (
	<ul className="list-unstyled todo-all-list mb-0 ie-flex">
		{(toDos && toDos !== null) && toDos.map((todo, key) => {
			return (
				<TodoListItem
					key={key}
					todo={todo}
					sortIndex={key}
					index={key}
					onSelectTodo={onSelectTodo}
					onCheckBoxClickTodoItem={onCheckBoxClickTodoItem}
					getTaskLabelNames={getTaskLabelNames}
				/>
			)
		})}
	</ul>
);

function TaskListing(props){
   const [anchorEl, setAnchorEl] = useState(null);
   const [labelMenu, setLabelMenu] = useState(false);
   const [optionsMenu, setOptionsMenu] = useState(false);
   const dispatch = useDispatch();
   const todoApp = useSelector(state=> state.todoApp);
   
   useEffect(() => {
      dispatch(fetchTodos());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

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

   /**
    * On Checkbox click todo item
    */
	const onCheckBoxClickTodoItem = (todo) => {
		dispatch(onCheckBoxToggleTodoItem(todo));
	}

   /**
    * On Select Todo List Item
    */
	const onSelectTodo = (todo) => {
      dispatch(onSelectTodoAction(todo));
		setTimeout(() => {
         dispatch(hideLoadingIndicatorAction());
		}, 1200);
	}

	const handleClose = () => {
      setAnchorEl(null);
      setLabelMenu(false);
      setOptionsMenu(false);
	}

	const handleClick = event => {
      setAnchorEl(event.currentTarget);
      setOptionsMenu(true);
	}

   /**
    * on all todo select
    */
	const onAllTodoSelect = () => {
      const selectAll = todoApp.selectedToDos < todoApp.toDos.length;
		if (selectAll){
			dispatch(selectAllTodo());
		} else {
         dispatch(getUnselectedAllTodo());
		}
	}

   /**
    * on option menu select
    */
	const onOptionMenuItemSelect = (option) => {
		switch (option.title) {
			case 'All':
				handleClose();
            dispatch(selectAllTodo());
				break;
			case 'None':
				handleClose();
            dispatch(getUnselectedAllTodo());
				break;
			case 'Starred':
				handleClose();
            dispatch(selectStarredTodo());
				break;
			case 'Unstarred':
				handleClose();
            dispatch(selectUnStarredTodo());
				break;
			default:
				break;
		}
	};

   /**
    * On Label Select Menu
    */
	const labelSelect = event => {
      dispatch(onLabelSelect());
      setAnchorEl(event.currentTarget)
      setLabelMenu(true);
	};

   /**
    * On Label Select
    */
	const labelMenuItemSelect = (label) => {
		handleClose();
		dispatch(onLabelMenuItemSelect(label));
	}

   /**
   * Get Scroll Height
   */
	const getScrollHeight = () => {
		const { location } = props;
		const appLayout = getAppLayout(location)
		switch (appLayout) {
			case 'app':
				return 'calc(100vh - 197px)';
			case 'agency':
				return 'calc(100vh - 382px)';
			case 'boxed':
				return 'calc(100vh - 382px)';
			case 'horizontal':
				return 'calc(100vh - 248px)';
			default:
				break;
		}
	}

   const { toDos, selectedToDos, labels } = todoApp;
   console.log(toDos,'toDos')
   return (
      <div className="list-wrap">
         <div className="top-head">
            <Checkbox color="primary"
               indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
               checked={selectedToDos > 0}
               onChange={() => onAllTodoSelect()}
               value="SelectMail"
            />
            <IconButton onClick={handleClick} aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true">
               <i className="zmdi zmdi-caret-down"></i>
            </IconButton>
            {(selectedToDos > 0) &&
               <IconButton onClick={labelSelect}>
                  <i className="zmdi zmdi-label-alt" />
               </IconButton>}
            <Menu
               id="long-menu"
               anchorEl={anchorEl}
               open={optionsMenu}
               onClose={handleClose}
               PaperProps={{
                  style: {
                     width: 200
                  }
               }}>
               {options.map((option, key) => (
                  <MenuItem key={key} onClick={() => onOptionMenuItemSelect(option)}>{option.title}
                  </MenuItem>
               ))}
            </Menu>
            <Menu id="label-menu"
               anchorEl={anchorEl}
               open={labelMenu}
               onClose={handleClose}
               MenuListProps={{
                  style: {
                     width: 150,
                  },
               }}>
               {console.log(labels,'labels')}
               {labels.map(label =>
                  <MenuItem key={label.value} onClick={() => labelMenuItemSelect(label)}>
                     <IntlMessages id={label.name} />
                  </MenuItem>,
               )}
            </Menu>
         </div>
         <Scrollbars
            className="rct-scroll"
            autoHide
            style={{ height: getScrollHeight() }}
         >
            <SortableList
               toDos={toDos}
               onSelectTodo={onSelectTodo}
               onCheckBoxClickTodoItem={onCheckBoxClickTodoItem}
               getTaskLabelNames={getTaskLabelNames}
            />
         </Scrollbars>
      </div>
   );
}


export default withRouter(TaskListing);
