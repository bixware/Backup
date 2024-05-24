/**
 * Labels Filters
 * Used To Filter Todo List
 */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

// redux action
import { activateFilterAction } from 'Store/Actions';

function LabelsFilters() {
   const dispatch = useDispatch();
   const todoApp = useSelector(state => state.todoApp);
    /**
     * Function to filter the todo list with labels
     */
   const onFilterTodo = (activeIndex) => {
      dispatch(activateFilterAction(activeIndex));
   }

    /**
     * Get Label Classes
     */
   const getLabelClasses = (value) => {
      let labelClasses = '';
      switch (value) {
         case 1:
               labelClasses = 'ladgend bg-success';
               return labelClasses;
         case 2:
               labelClasses = 'ladgend bg-primary';
               return labelClasses;
         case 3:
               labelClasses = 'ladgend bg-info';
               return labelClasses;
         case 4:
               labelClasses = 'ladgend bg-danger';
               return labelClasses;
         default:
               return labelClasses;
      }
   }

   const { labels, activeFilter } = todoApp;
   return (
      <div className="rct-full-block filters">
         <div className="rct-block-content">
            <List className="list-unstyled" subheader={<ListSubheader>Labels</ListSubheader>}>
               {labels.map((label, key) => (
                  <ListItem button onClick={() => onFilterTodo(label.value)} key={key} className={classnames({ 'item-active': activeFilter === label.value })}>
                     <span className={getLabelClasses(label.value)}></span> <span className="filter-title">{label.name}</span>
                  </ListItem>
               ))}
            </List>
         </div>
      </div>
   );
}

export default LabelsFilters;
