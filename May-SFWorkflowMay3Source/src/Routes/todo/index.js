/**
 * Todo Redux App
 */
import React, { useState, useEffect } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Drawer, AppBar, Toolbar, IconButton, Hidden} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
// component
import AddNewTask from './components/AddNewTask';
import TaskListing from './components/TaskListing';
import TaskStatusFilter from './components/TaskStatusFilter';
import TaskDetails from './components/TaskDetails';
// redux actions
import { closeSnakbarAction, updateSearch, onSearchTodo, getTodos } from 'Store/Actions';
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: 'auto',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		marginLeft: theme.direction !== 'rtl' ? drawerWidth : 0,
		marginRight: theme.direction === 'rtl' ? drawerWidth : 0,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		}
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

function TodoList(){
   const classes = useStyles();
   const [mobileOpen,setMobileOpen] = useState(false);
   const todoApp = useSelector(state=> state.todoApp);
   const setttings = useSelector(state => state.settings);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTodos());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])
   
	const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
	};

	/**
	 * Search Todo Hanlder
	 */
	const onUpdateSearch = (e) => {
      dispatch(updateSearch(e.target.value));
      dispatch(onSearchTodo(e.target.value));
	}

   const { selectedTodo, showMessage, message, searchTodo}  = todoApp
   const drawer = (
      <div className="todo-sidebar-wrap">
         <div className="user-wrap d-flex justify-content-between">
            <div className="media align-items-center">
               <img
                  src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-5.jpg`}
                  alt="user-profile"
                  className="img-fluid rounded-circle mr-3"
                  width="60"
                  height="60"
               />
               <div className="media-body">
                  <h5 className="text-white mb-0">Jhon Doe</h5>
                  <p className="text-white font-xs mb-0">jhon@example.com</p>
               </div>
            </div>
         </div>
         <AddNewTask />
         <TaskStatusFilter />
      </div>
   );
   return (
      <div className="todo-wrapper">
         <Helmet>
            <title>Todo App</title>
            <meta name="description" content="Todo App" />
         </Helmet>
         <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
               <Toolbar className="d-flex justify-content-between">
                  <IconButton
                     aria-label="open drawer"
                     onClick={handleDrawerToggle}
                     className={classes.navIconHide}>
                     <MenuIcon />
                  </IconButton>
                  <FormGroup className="mb-0 w-25">
                     <Input type="search"
                        name="search"
                        id="search-todo"
                        className="has-input-right"
                        placeholder="Search.."
                        onChange={(e) => onUpdateSearch(e)}
                        value={searchTodo}
                     />
                  </FormGroup>
                  <div className="d-flex align-items-center">
                     <IconButton className="mx-1 btn-sm">
                        <i className="zmdi zmdi-arrow-left"></i>
                     </IconButton>
                     <IconButton className="mx-1 btn-sm">
                        <i className="zmdi zmdi-arrow-right"></i>
                     </IconButton>
                  </div>
               </Toolbar>
            </AppBar>
            <Hidden mdUp className="todo-list-wrap">
               <Drawer
                  variant="temporary"
                  anchor={setttings.rtlLayout === true ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                     paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                     keepMounted: true,
                  }}
               >
                  {drawer}
               </Drawer>
            </Hidden>
            <Hidden smDown implementation="css" className="todo-list-wrap">
               <Drawer
                  variant="permanent"
                  open
                  classes={{
                     paper: classes.drawerPaper,
                  }}
               >
                  {drawer}
               </Drawer>
            </Hidden>
            <div className={`bg-transparent ${classes.content}`}>
               <div className={classes.toolbar} />
               {selectedTodo === null ?
                  <TaskListing />
                  : 
                  <TaskDetails />
               }
            </div>
         </div>
         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showMessage}
            message={<span id="message-id">{message}</span>}
            autoHideDuration={1000}
            onClose={() => dispatch(closeSnakbarAction())}
         />
      </div>
   );
}

export default TodoList;
